from django.shortcuts import render

# Create your views here.

def transfer(request):
    if request.method == 'POST':
        print(request.POST)
        return render(request, 'transfer/transfer.html')


    return render(request, 'transfer/transfer.html')