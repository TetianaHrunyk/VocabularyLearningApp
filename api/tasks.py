from celery import shared_task 


@shared_task(name='update_progress') 
def update_cards_progress():
    from .models import Cards
    return Cards.objects.all().update(for_nat=F('for_nat')-0.05)

@shared_task(name='update_progress_by') 
def update_cards_progress_by(value):
    from .models import Cards
    return Cards.objects.all().update(for_nat=F('for_nat')-value)
