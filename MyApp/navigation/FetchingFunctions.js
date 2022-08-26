export default class FetchingFunctions {

  static GetCategories() {
    return (
      fetch(`http://127.0.0.1:8000/get_categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }
  
  // static GetCategoryItems(categoryId) {
  //   return (
  //     fetch(`http://127.0.0.1:8000/category_items/${categoryId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     .then((response) => { // This way will stop promise if error occur
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }

  // static GWI(uri, id) {
  //   return (
  //     fetch(`http://127.0.0.1:8000/${uri}/${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     .then((response) => { // This way will stop promise if error occur
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }

  static GetItemImages(itemId) {
    return (
      fetch(`http://127.0.0.1:8000/item_images/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GetDishItems(dishId) {
    return (
      fetch(`http://127.0.0.1:8000/dish_items/${dishId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GetDeals() {
    return (
      fetch(`http://127.0.0.1:8000/get_deals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  // REGISTER
  static Register(body) {
    return (
      fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        // return response.json()
      })
    )
  }

  // CHECK CURRENT TOKEN
  static CurrentUser(token) {
    return (
      fetch("http://127.0.0.1:8000/current_user", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token}`
        },
      })
      .then(response => {
        // if (!response.ok) {
        //   throw Error(response.statusText)
        // }
        return response.json()
      })
    )
  }

  // Log in, fetch Token 
  // static Login(body) {
  //   return (
  //     fetch("http://127.0.0.1:8000/auth/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(body)
  //     })
  //     .then((response) => {
  //       if (!response.ok) {
  //         // console.log("Error")
  //         throw Error(response.statusText)
  //       }
  //       // console.log("Success")
  //       return response.json()
  //     })
  //   )
  // }

  // LOGIN FOR JWT
  // static Login(object) {
  //   return (
  //     fetch(`http://127.0.0.1:8000/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify({'username': 'superbin1996', 'password': 'django.bin@28896d'}),
  //       body: object,
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }

  static Order(token, body) {
    return(
      fetch(`http://127.0.0.1:8000/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token['kfc']}`,
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        console.log("Success")
        // return response.json()
      })
    )
  }

  static GetOrderHistory(token) {
    return(
      fetch(`http://127.0.0.1:8000/order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token['kfc']}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static G(uri) {
    return (
      fetch(`http://127.0.0.1:8000/${uri}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GWT(uri, token) {
    return (
      fetch(`http://127.0.0.1:8000/${uri}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token['kfc']}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  // Log in, fetch Token 
  static P(uri, body) {
    return (
      fetch(`http://127.0.0.1:8000/${uri}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

}

