import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
import joblib
import numpy as np

# Load the dataset
def train_model():
    file_path = 'Dataset_Final.csv'
    dataset = pd.read_csv(file_path)

    # Step 1: Data Preprocessing
    dataset = dataset.dropna()

    # Encode categorical columns
    label_encoders = {}
    for column in dataset.select_dtypes(include=['object']).columns:
        le = LabelEncoder()
        dataset[column] = le.fit_transform(dataset[column])
        label_encoders[column] = le

    # Split features and target
    X = dataset.drop('Role', axis=1)
    y = dataset['Role']

    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Split the dataset into training and testing data
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # Train the model
    model = KNeighborsClassifier()
    model.fit(X_train, y_train)

    # Save the model, scaler, and label encoders
    joblib.dump(model, 'knn_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(label_encoders, 'label_encoders.pkl')

# Function to load the model and make predictions
def predict_role(input_features):
    # Load saved components
    model = joblib.load('knn_model.pkl')
    scaler = joblib.load('scaler.pkl')
    label_encoders = joblib.load('label_encoders.pkl')

    # Scale input features
    input_scaled = scaler.transform([input_features])

    # Predict probabilities
    probabilities = model.predict_proba(input_scaled)[0]

    # Get the top 3 class indices with the highest probabilities
    top_3_indices = np.argsort(probabilities)[-3:][::-1]

    # Decode the predicted labels
    top_3_roles = [label_encoders['Role'].inverse_transform([index])[0] for index in top_3_indices]
    return top_3_roles

if __name__ == "__main__":
    train_model()
