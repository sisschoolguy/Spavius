// Load analytics data and render charts
document.addEventListener('DOMContentLoaded', function() {
    // Load analytics data from localStorage
    const analyticsData = JSON.parse(localStorage.getItem('spaviusAnalytics')) || {
        totalVisits: 0,
        curriculumCounts: {},
        gradeCounts: {},
        subjectCounts: {},
        averageTimeSpent: 0,
        apiKeyUploads: 0
    };

    // Display basic stats
    document.getElementById('totalVisits').textContent = analyticsData.totalVisits;
    document.getElementById('avgTimeSpent').textContent = formatTime(analyticsData.averageTimeSpent);
    document.getElementById('apiKeyUploads').textContent = analyticsData.apiKeyUploads;

    // Render charts
    renderChart('curriculumChart', 'Curriculum Distribution', analyticsData.curriculumCounts);
    renderChart('gradeChart', 'Grade Distribution', analyticsData.gradeCounts);
    renderChart('subjectChart', 'Subject Distribution', analyticsData.subjectCounts);
});

// Format time in seconds to human-readable format
function formatTime(seconds) {
    if (seconds < 60) {
        return `${Math.round(seconds)}s`;
    } else if (seconds < 3600) {
        return `${Math.round(seconds / 60)}m`;
    } else {
        return `${Math.round(seconds / 3600)}h`;
    }
}

// Render a bar chart
function renderChart(canvasId, title, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Sort data by count (descending)
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedData.map(item => item[0]),
            datasets: [{
                label: title,
                data: sortedData.map(item => item[1]),
                backgroundColor: getChartColors(sortedData.length),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Generate chart colors
function getChartColors(count) {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
        const hue = i * hueStep;
        colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
    }
    
    return colors;
}