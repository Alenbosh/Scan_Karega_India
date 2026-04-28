import json
import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")


def _parse_origins(raw_value: str) -> list[str]:
    if not raw_value:
        return ["http://localhost:5173", "http://localhost:3000"]

    try:
        parsed = json.loads(raw_value)
        if isinstance(parsed, list):
            return [str(item) for item in parsed]
    except json.JSONDecodeError:
        pass

    return [item.strip() for item in raw_value.split(",") if item.strip()]


class Settings:
    def __init__(self) -> None:
        self.ALLOWED_ORIGINS = _parse_origins(os.getenv("ALLOWED_ORIGINS", ""))
        self.ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
        self.GEMINI_API_KEY = (
            os.getenv("GEMINI_API_KEY", "")
            or os.getenv("GOOGLE_API_KEY", "")
            or os.getenv("ANTHROPIC_API_KEY", "")
        )

        # ⬇️ ADD THESE
        self.MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        self.MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "ski_db")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(
            os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
        self.ALGORITHM = os.getenv("ALGORITHM", "HS256")
        self.SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")


settings = Settings()
