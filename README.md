# Project App: KFC

## KFC order site (`mobile first`)  
https://youtu.be/nV5THz9gguo

## Creator: superbin1996

________________

> ### Project structure:  

- `server` directory is project folder,   
- `kfc` directory is app folder,   
- `kfc/media` directory stores media/image files  
- `kfc/client` is client-frontend,   
    - `kfc/client/App.js` is root js file
    - `kfc/client/navigation` subfolder contains `bottomTabs` and `stacks` folder. Which are website pages components.  
        - `bottomTabs` includes `Home`, `Cart` and `Setting`
        - `stacks` includes mainly pages of `Home` bottomTabs
            - `stacks` folder also includes `components` folder. Which contains components of pages
- `kfc/client/assets/wrappers` stores wrapper for style
- `kfc/client/context/appContext.js` includes some functions and style
________________

> ### To setup project (work both for production and development)  
  
On terminal in `root directory` (if `npm` and `python` was installed):  
Create python visual environment and activate it. After that, run:  

```js
npm run setup-project  
```
> Open package.jon and refer to scripts for more details  

________________
> ### To run project (for both client and server simultaneously, for development)  

- On terminal in `root directory`, run (if `npm` was installed):  

    - On `windows`:
        ```js
        npm start
        ```

    - On `ubuntu`:
        ```js
        npm run start-ubuntu
        ```

________________
## Run server only (production)

on terminal in `root directory`, run:  

For `windows`:  
```py
python manage.py runserver --insecure
```

For 'ubuntu':

```py
python3 manage.py runserver --insecure
```
Add `--insecure` because in `server/settings.py`, DEBUG=False


________________
> ### Run server and client separately or more details about setup and operate command

- Open package.jon and refer to scripts  


________________

> ### To add items as admin (`sequences`):  
- `Picture`, add image
- `Item`, add single-item
- `Selection`. selection of single-items
- `Dish`. dishes show on menu (user interface)  
- `Deals`, news and `Vouchers` for discount  

    Note: Many fields are duplicate when you try to add dish to menu. I still cannot optimize models structure.



