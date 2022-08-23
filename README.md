# web50 finalproject-capstone  

## KFC order site  

## Creator: superbin1996

## Distinctiveness and Complexity:  
- This web application isn't social network site  
- This web application is e-commerce site but forcus on front-end, mobile-first
- This web application utilize Django on back-end and react-native on front-end
- This web application is mobile-responsive(Not all device, but mainly test on Iphone 12)

### To run (using bash in ubuntu 22.04):
In capstone `root` folder:
- run command line `pip install -r requirements.txt`
- run `python3 manage.py runserver`

In `MyApp` subdirectory:
- run command line `npm install`  
- run `sudo npm install --global expo-cli` to install react-native expo  
- press `w` to open for web  
- If browser doesn't automatically open web application, try to access `http://localhost:19006/`site  

### To access admin site:    
- Create `superuser` account by cli in root folder  
- Access `http://127.0.0.1:8000/admin/login/?next=/admin/` site and login  

### To add items as admin:  
- Add item in `Pictures`(not require)
- Add single-item in `Items` 
- Add choice-item in `Selection`
- Add dish to show in menu in `Dishs`
- You may add `Deals` for news and `Vouchers` for discount



