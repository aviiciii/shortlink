from django.shortcuts import render
from dotenv import load_dotenv
import os
import requests
import json
from django.http import JsonResponse

# Create your views here.
load_dotenv()


def transfer(request):
    if request.method == 'POST':
        # get the post parameters json
        longurl = json.loads(request.body)['link']
        
        
        # link.laavesh.ml/we link id
        url = "https://api.short.io/links/lnk_2MIx_9dCPkouo4fY"

        # https://developers.short.io/docs/updating-an-existing-short-url

        payload = json.dumps({"allowDuplicates": False, "domain": "we.laavesh.ml", "originalURL": longurl })
        headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'authorization': os.getenv("API_KEY")
        }

        response = requests.request("POST", url, data=payload, headers=headers)

        return JsonResponse(response.json())




    return render(request, 'transfer/transfer.html')