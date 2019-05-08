/// <summary>
/// Converts polar coordinate to cartesian coordinate.
/// </summary>
public static Vector3 PolarToCartesian(float radius, float angle)
{
    float x = radius * Mathf.Cos(DegreeToRadian(angle));
    float z = radius * Mathf.Sin(DegreeToRadian(angle));
    return new Vector3(x, 0f, z);
}

/// <summary>
/// Converts degrees to radians.
/// </summary>
public static float DegreeToRadian(float degree)
{
    return degree * Mathf.PI / 180f;
}

/// <summary>
/// Copies component of any type from one object to another.
/// </summary>
T CopyComponent<T>(T from, GameObject to) where T : Component
{
    System.Type type = from.GetType();
    Component copy = to.AddComponent(type);
    System.Reflection.FieldInfo[] fields = type.GetFields();
    foreach (System.Reflection.FieldInfo field in fields)
    {
        field.SetValue(copy, field.GetValue(from));
    }
    return copy as T;
}
