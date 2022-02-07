# ecom
 
# Backend

Python Version = 3.8.2

### Libraries
```sh
pip install django
pip install python-rest-framework 
pip install django-cors-headers
pip install djoser
pip install pillow
pip install stripe
```
django-admin start <name> "ecom_backend"

### Creating first admin user:
```sh
python manage.py createsuperuser 
```

for test:
```sh
username :"admin" 
email: "test@test123.com"
password: "123123" 
```

## Run
```sh
python manage.py runserver
```

[http://localhost:8000/admin](http://localhost:8000/admin)


----
# Frontend

###### Setup: 'npm install -g @vue/cli@3.0.4'

### Libraries
###### use 'npm install'

```sh
npm install axios
npm install bulma
npm install bootstrap bootstrap-vue
npm install element-ui -S
npm install popperjs/core
```

## Run
```sh
npm run serve
```

[http://localhost:8080/](http://localhost:8080/)
