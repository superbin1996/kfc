# from django.shortcuts import render
from .models import Category, Dish, Selection, User, Voucher, Order, Deal
from icecream import ic
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import Token
from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import AllowAny

# Create your views here.


@api_view(['GET'])
def get_categories(request):
    """
    Get categories
    """
    categories = Category.objects.values()
    # ic(categories)

    return Response(categories, status=200)


@api_view(['GET'])
def category_items(request, category_id):
    """
    Get items for each category
    """
    # items = Category.objects.get(id=category_id).pictures.values()
    dishes = Dish.objects.filter(category=category_id).values(
        'id', 'name', 'description', 'category', 'category__field', 'price')
    # ic(items)

    return Response(dishes, status=200)


@api_view(['GET'])
def item_images(request, item_id):
    """
    Get items for each category
    """
    images = Dish.objects.get(id=item_id).images.values('image', 'image_url')
    # ic(images)

    return Response(images, status=200)


@api_view(['GET'])
def dish_items(request, dish_id):
    """
    Get Dish Choices
    """
    dish = Dish.objects.prefetch_related(
        'single_items', 'selections').get(id=dish_id)
    selections_id = dish.selections.values('id')
    dish_selections = []
    if len(selections_id) != 0:
        for id in selections_id:
            selections = Selection.objects.prefetch_related('choices', 'default').get(
                id=id['id'])
            choices = selections.choices.values(
                'id', 'name', 'price', 'category__field', 'image__image', 'image__image_url')

            default = {
                'id': selections.default.id,
                'selectionId': id['id'],
                'name': selections.default.name,
                'price': selections.default.price,
                'amount': selections.amount,
                'due': 0,
                'category__field': selections.default.category.field,
            }

            for choice in choices:
                choice['selectionId'] = id['id']
                due = choice['price'] - default['price']
                if due > 0:
                    choice['due'] = due
                else:
                    choice['due'] = 0

            dish_selections.append({
                'default': default,
                'choices': choices,
            })
    # ic(list(dish_selections))

    single_items = dish.single_items.values(
        'id', 'name', 'category__field', 'price')
    for single_item in single_items:
        single_item['amount'] = 1

    # ic(list(single_items))

    return Response({
        'id': dish_id,
        'selections': dish_selections,
        'singleItems': single_items,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_deals(request):
    deals = Deal.objects.values(
        'id', 'title', 'dish__category', 'image', 'image_url', 'hashtag', 'start', 'end', 'description')
    return Response(deals, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def current_user(request):
    # request.user only work when have token Authorization
    current_user = request.user
    user = {
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email,
    }
    # ic(user)

    return Response(user, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.create_user(username=username, password=password)
        # ic(user)
        Token.objects.create(user=user)
        # ic(token)
        return Response(status=status.HTTP_201_CREATED)
    except:
        return Response({'detail': 'Wrong username or password'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def order(request):
    if request.method == 'POST':
        data = request.data.get('data')
        orderDetails = data['orderDetails']
        orders = data['orders']
        for element in orderDetails:
            order_id = element['order']['id']
            id = element['order']['categoryDish']['id']
            amount = element['order']['amount']
            details = element['order']
            promotion = element['promotion']
            try:
                dish = Dish.objects.get(id=id)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)

            try:
                voucher = Voucher.objects.get(name=promotion)
                price = int(element['order']['price']) * voucher.discount
            except:
                voucher = None
                price = element['order']['price']

            Order.objects.create(
                order_id=order_id,
                user=request.user,
                dish=dish,
                amount=amount,
                details=details,
                discount=voucher,
                price=price,
                orders=orders,
            )
        return Response(status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        orders_array = list(Order.objects.values('orders').distinct())
        # ic(data[0])
        return Response(orders_array, status=status.HTTP_200_OK)


# JWT
# @api_view(['POST'])
# def login(request):
#     # data = json.loads(request.body)
#     # data =
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = authenticate(username=username, password=password)

#     if user is not None:
#         sliced_pw = slice(10)
#         pw = password[sliced_pw]
#         payload_data = {
#             'username': username,
#             'code': user.id,
#             'rune': pw
#         }
#         key = 'superbin1996'
#         token = jwt.encode(
#             payload_data,
#             key,
#             algorithm='HS256',
#         )
#         ic(token)
#         ic(user)

#         return Response(token, status=200)
#     else:
#         return Response({'detail': 'Wrong username or password'}, status=status.HTTP_404_NOT_FOUND)

# class BlacklistTokenView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         try:
#             refresh_token = request.data['refresh_token']
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
