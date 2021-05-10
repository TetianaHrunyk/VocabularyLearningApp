release: python manage.py migrate
web: gunicorn backend.wsgi --log-file -
worker: celery worker --app=tasks.app