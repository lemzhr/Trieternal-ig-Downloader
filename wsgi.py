import sys
import os
from dotenv import load_dotenv

project_home = '/home/ariel0912/trieternalx-instagram-Downloader'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

dotenv_path = os.path.join(project_home, '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

from app import app as application
