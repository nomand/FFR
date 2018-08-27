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

