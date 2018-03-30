-- Insert a set of records.

INSERT INTO patients
    (patient_name, user_name, password)
VALUES
    ('John Doe', 'JohnDoe', 'password');
INSERT INTO healthStats
    (patient_id, diet_recommendation, risk_factor, diet_restriction)
VALUES
    ('1', 'low-sodium', 'high-cholesterol', 'gluten-free');
INSERT INTO doctors
    (patient_id, doctor_name, user_name, password)
VALUES
    ('1', 'Doogie Howser', 'Doogie', 'nph');
INSERT INTO savedRecipes
    (patient_id, recipe, favorite)
VALUES
    ('1', 'http://www.edamam.com/ontologies/edamam.owl#recipe_54b6f6cdc6f4d67a2c1d00ba7279cfd4', true);
