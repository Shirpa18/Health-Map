from ai.cluster import detect_clusters


def analyze_reports(reports):
    """
    Run HealthMap AI analysis on stored health reports.
    """

    # If there are no reports
    if not reports:
        return {
            "clusters": [],
            "total_reports": 0,
            "total_people_affected": 0
        }

    # Detect geographic clusters
    clusters = detect_clusters(
        reports,
        radius_km=2.0,
        min_reports=2
    )

    # Calculate total people affected
    total_people = sum(
        report.get(
            "people_affected",
            1
        )
        for report in reports
    )

    return {
        "clusters": clusters,
        "total_reports": len(reports),
        "total_people_affected": total_people
    }