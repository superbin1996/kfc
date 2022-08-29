# web50 finalproject-capstone  

## KFC order site (mobile first)  
https://youtu.be/nV5THz9gguo

## Creator: superbin1996

> ### Distinctiveness and Complexity:  
- This web application isn't social network site  
- This web application is e-commerce site for food order, forcusing on front-end, mobile-first
- This web application utilize Django on back-end and react-native on front-end
- This web application is mobile-responsive. Not all device, but mainly test on Iphone 12.  
Remember to reload site everytime you change windows dimensions to see responsive change  

> ### Composition:  
- `/capstone/finalproject`: setup of django project  
- `/capstone/capstone`: setup of `capstone` app  
- `/castone/media`: media folder storing pictures  
- `/capstone/MyApp`: front-end subfolder, react-native-expo
    - `/capstone/MyApp/App.js` is root js file
    - `/capstone/MyApp/navigation` subfolder contains `bottomTabs` and `stacks` folder. Which are website pages components.  
        - `bottomTabs` includes `Home`, `Cart` and `Setting`
        - `stacks` includes mainly pages of `Home` bottomTabs
            - `stacks` folder also includes `components` folder. Which contains components of pages

    - `/capstone/MyApp/navigation/FetchingFunctions.js` contains api functions
    - `/capstone/MyApp/navigation/Style.js` contains some stylesheets, not entirely


> ### To run (using bash in ubuntu 22.04):  
- In `/capstone` root folder:
    - run command line `pip install -r requirements.txt`
    - run `python3 manage.py runserver`

- In `/capstone/MyApp` subdirectory:
    - run command line `npm install`  
    - run `sudo npm install --global expo-cli` to install react-native expo  
    - press `w` to open for web  
    - If browser doesn't automatically open web application, try to access `http://localhost:19006/`site    

- Access admin site:
    - Create `superuser` account by cli in root folder  
    - Access `http://127.0.0.1:8000/admin/login/?next=/admin/` site and login  

#### To add items as admin:  
- Add item in `Pictures`(not require)
- Add single-item in `Items`. Item chooses picture from `Pictures` 
- Add choice-item in `Selection`. Choice-item chooses picture from `Pictures` and choose items from `Items`
- Add dish to show in menu (User interface) in `Dishs`. Dish chooses single-items from `Items`, choice-items from `Selection` and picture from `Pictures`.  
You may need to add in order: `Pictures`-`Items`-`Selections`-`Dishs`
- You may add `Deals` for news and `Vouchers` for discount  
Note: Many fields are duplicate when you try to add dish to menu. I still cannot optimize models structure.



