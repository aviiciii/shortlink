import requests
from dotenv import load_dotenv
import os
load_dotenv()

url = "https://api.short.io/links/lnk_2MDV_9dCPkouhKSC"

import json
payload = json.dumps({"allowDuplicates": False, "domain": "link.laavesh.ml", "path": "trans" })
headers = {
    'accept': "application/json",
    'content-type': "application/json",
    'authorization': os.getenv("API_KEY")
    }

response = requests.request("POST", url, data=payload, headers=headers)

res = json.dumps(response.json(), indent=4)

print(res)