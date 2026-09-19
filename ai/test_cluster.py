from cluster import detect_clusters


print("TEST STARTED")


reports = [

    {
        "latitude": 12.925,
        "longitude": 74.860,
        "category": "Fever",
        "people_affected": 5
    },

    {
        "latitude": 12.926,
        "longitude": 74.861,
        "category": "Fever",
        "people_affected": 8
    },

    {
        "latitude": 12.924,
        "longitude": 74.859,
        "category": "Fever",
        "people_affected": 6
    },

    {
        "latitude": 12.872,
        "longitude": 74.848,
        "category": "Respiratory",
        "people_affected": 2
    }

]


clusters = detect_clusters(reports)


print()
print("CLUSTERS DETECTED:", len(clusters))


for cluster in clusters:

    print()
    print("CLUSTER")
    print("----------------")

    print(
        "Cluster ID:",
        cluster["cluster_id"]
    )

    print(
        "Reports:",
        cluster["report_count"]
    )

    print(
        "People affected:",
        cluster["people_affected"]
    )

    print(
        "Location:",
        cluster["latitude"],
        cluster["longitude"]
    )