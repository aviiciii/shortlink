import requests
from dotenv import load_dotenv
import os
load_dotenv()

url = "https://api.short.io/links/lnk_2MDV_9dCPkouhKSC"

import json

# https://developers.short.io/docs/updating-an-existing-short-url

payload = json.dumps({"allowDuplicates": False, "domain": "link.laavesh.ml", "originalURL": "google.com" })
headers = {
    'accept': "application/json",
    'content-type': "application/json",
    'authorization': os.getenv("API_KEY")
}

response = requests.request("POST", url, data=payload, headers=headers)

res = json.dumps(response.json(), indent=4)

print(res)