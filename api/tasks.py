from celery import shared_task 



@shared_task(name='update_progress') 
def update_cards_progress():
    from .models import Cards
#    return Cards.objects.all().update(for_nat=F('for_nat')-0.05)
    Cards.objects.all().update(for_nat=F('for_nat')-0.05)
    Cards.save()

@shared_task(name='update_progress_by') 
def update_cards_progress_by(value):
    from .models import Cards
    Cards.objects.all().update(for_nat=F('for_nat')-value)
    Cards.save()

@shared_task(name='update_progress')
def update_cards_progress_periodic():
    from .models import Cards
    Cards.objects.all().update(for_nat=F('for_nat')-0.05)
    Cards.save()