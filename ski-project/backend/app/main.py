from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import scan, products, health_score, image_scan
from app.api.v1.router import api_router
from app.core.middleware import RateLimitMiddleware
from contextlib import asynccontextmanager
from app.core.database import connect_db
from app.routes.auth import router as auth_router


@asynccontextmanager
async def lifespan(app):
    await connect_db()
    yield

app = FastAPI(
    title="SKI — Scan Karega India API",
    version="0.1.0",
    description="AI-powered food quality monitoring platform",
    docs_url="/api/docs" if settings.DEBUG else None,
    lifespan=lifespan,

)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router,         prefix="/api/scan",
                   tags=["Scan"])
app.include_router(products.router,
                   prefix="/api/products",     tags=["Products"])
app.include_router(health_score.router,
                   prefix="/api/health-score", tags=["Health Score"])
app.include_router(image_scan.router,
                   prefix="/api/image-scan",   tags=["Image Scan"])

app.add_middleware(RateLimitMiddleware)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "SKI API is running", "version": "0.1.0", "docs": "/docs"}
