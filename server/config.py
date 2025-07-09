# Standard library imports

# Remote library imports
import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from authlib.integrations.flask_client import OAuth

# Instantiate app, set attributes
app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY") or "dev-secret-key"
app.json.compact = False

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


app.config['GITHUB_CLIENT_ID'] = os.environ.get("GITHUB_CLIENT_ID")
app.config['GITHUB_CLIENT_SECRET'] = os.environ.get("GITHUB_CLIENT_SECRET")


# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)
api = Api(app)

oauth = OAuth(app)
github = oauth.register(
    name='github',
    client_id=app.config['GITHUB_CLIENT_ID'],
    client_secret=app.config['GITHUB_CLIENT_SECRET'],
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={
        'scope': 'user:email',
    },
)

def validate_oauth_config():
    """Validate that OAuth is properly configured"""
    if not app.config['GITHUB_CLIENT_ID']:
        print("WARNING: GITHUB_CLIENT_ID is not set!")
        print("Please set the GITHUB_CLIENT_ID environment variable")
        return False
    
    if not app.config['GITHUB_CLIENT_SECRET']:
        print("WARNING: GITHUB_CLIENT_SECRET is not set!")
        print("Please set the GITHUB_CLIENT_SECRET environment variable")
        return False
    
    print("✓ GitHub OAuth configuration is valid")
    return True

# Environment file template
ENV_TEMPLATE = """
# GitHub OAuth Configuration
# Get these from https://github.com/settings/applications/new

GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Other configuration
SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///app.db
"""

def create_env_template():
    """Create a .env template file"""
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write(ENV_TEMPLATE)
        print("✓ Created .env template file")
        print("Please update .env with your actual GitHub OAuth credentials")
    else:
        print("✓ .env file already exists")

if __name__ == '__main__':
    create_env_template()
    validate_oauth_config()

# Instantiate CORS
CORS(app)
