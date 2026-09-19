import math


def distance_km(lat1, lon1, lat2, lon2):
    """
    Approximate distance between two geographic points in kilometers.

    This uses a simple latitude/longitude approximation,
    which is sufficient for our local-area clustering.
    """

    lat_distance = (lat2 - lat1) * 111

    lon_distance = (
        (lon2 - lon1)
        * 111
        * math.cos(math.radians(lat1))
    )

    return math.sqrt(
        lat_distance ** 2
        + lon_distance ** 2
    )


def detect_clusters(
    reports,
    radius_km=2.0,
    min_reports=2
):
    """
    Detect geographic clusters without external ML libraries.

    Parameters:
        reports:
            List of dictionaries containing:
                latitude
                longitude
                people_affected

        radius_km:
            Maximum distance between reports
            for them to belong to the same cluster.

        min_reports:
            Minimum number of reports required
            to create a cluster.

    Returns:
        List of detected clusters.
    """

    if len(reports) < min_reports:
        return []

    visited = set()
    clusters = []

    for i, report in enumerate(reports):

        # Skip reports that already belong
        # to a previously detected cluster
        if i in visited:
            continue

        nearby = []

        # Find reports close to the current report
        for j, other in enumerate(reports):

            if i == j:
                continue

            distance = distance_km(
                report["latitude"],
                report["longitude"],
                other["latitude"],
                other["longitude"]
            )

            if distance <= radius_km:
                nearby.append(j)

        # If there are not enough reports nearby,
        # this report does not form a cluster
        if len(nearby) + 1 < min_reports:
            visited.add(i)
            continue

        # Create a cluster containing the current
        # report and all nearby reports
        cluster_indices = {i}

        for index in nearby:
            cluster_indices.add(index)

        # IMPORTANT:
        # Mark every report in this cluster as visited.
        # This prevents the same cluster from
        # being detected multiple times.
        visited.update(cluster_indices)

        cluster_reports = [
            reports[index]
            for index in cluster_indices
        ]

        # Calculate center of the cluster
        avg_latitude = sum(
            r["latitude"]
            for r in cluster_reports
        ) / len(cluster_reports)

        avg_longitude = sum(
            r["longitude"]
            for r in cluster_reports
        ) / len(cluster_reports)

        # Calculate total people affected
        total_people = sum(
            r.get("people_affected", 1)
            for r in cluster_reports
        )

        # Store cluster information
        clusters.append({
            "cluster_id": len(clusters) + 1,

            "latitude": avg_latitude,

            "longitude": avg_longitude,

            "report_count": len(cluster_reports),

            "people_affected": total_people,

            "reports": cluster_reports
        })

    return clusters