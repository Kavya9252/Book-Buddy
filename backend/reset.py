# reset.py

import sys
import os

# 👇 Add the current directory to sys.path so local imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import Base
from database import engine

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

print("✅ Database has been reset (dropped and recreated).")
