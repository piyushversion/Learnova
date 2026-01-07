import { Bar, Doughnut, Line, Radar,Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title
);


export const DashboardChart = ({stats}) => {

    // const coursenames = stats.map((item)=>(item.coursename));
    // const totalstudents = stats.map((item)=>(item.totalstudents));
    // const revenue = stats.map((item)=>(item.revenue));
    // const avgrating = stats.map((item)=>(item.avgrating));

    // console.log(stats);

  const courseNames = stats.courseStats.map((c) => c.coursename);
  const studentCounts = stats.courseStats.map((c) => c.students);
  const revenues = stats.courseStats.map((c) => c.revenue);
  const ratings = stats.courseStats.map((c) => c.avgRating);
  const completionRates = stats.courseStats.map((c) => c.completionRate);

    return(

        <div className="text-white flex flex-col gap-16 my-20">

            {/* <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Revenue by Course</h2>
        <Doughnut
          data={{
            labels: coursenames,
            datasets: [
              {
                data: revenue,
                backgroundColor: [
                  "#4F46E5",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#3B82F6",
                ],
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          }}
          options={{
            plugins: {
              legend: { position: "bottom" },
            },
          }}
        />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Students Enrolled</h2>
        <Bar
          data={{
            labels: coursenames,
            datasets: [
              {
                label: "Students",
                data: totalstudents,
                backgroundColor: "#3B82F6",
                borderRadius: 6,
              },
            ],
          }}
          options={{
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-center">Course Ratings</h2>
        <Radar
          data={{
            labels: coursenames,
            datasets: [
              {
                label: "Average Rating",
                data: avgrating,
                backgroundColor: "rgba(79,70,229,0.2)",
                borderColor: "#4F46E5",
                pointBackgroundColor: "#4F46E5",
              },
            ],
          }}
        />
            </div> */}

            <div className="w-full sm:w-[70%] mx-auto">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center font-nuninto tracking-wide text-[#dbdded]">Top Performing Courses</h2>

              <Bar data={{labels: courseNames,datasets: [{label: "Students Enrolled",data: studentCounts,backgroundColor: "#3B82F6",},],}}
              />

            </div>

            <div className="w-full sm:w-[70%] mx-auto">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center font-nuninto tracking-wide text-[#dbdded]">Revenue Distribution</h2>
              
              <Doughnut data={{labels: courseNames,datasets: [{data: revenues,backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],},],}}
              />
            </div>

            <div className="w-full sm:w-[70%] mx-auto">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center font-nuninto tracking-wide text-[#dbdded]">Course Completion Rate</h2>

              <Bar data={{labels: courseNames,datasets: [{label: "Completion %",data: completionRates,backgroundColor: "#F59E0B",},], }}
              />

            </div>

            <div className="w-full sm:w-[70%] mx-auto">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center font-nuninto tracking-wide text-[#dbdded]">Reviews Sentiment</h2>

              <Pie data={{labels: ["Positive", "Negative"],datasets: [{data: [stats.reviewsSentiment.positive, stats.reviewsSentiment.negative],backgroundColor: ["#10B981", "#EF4444"],},],}}
              />
              
            </div>

        </div>

    )

}


// {
//     "courseStats": [
//         {
//             "coursename": "Standard Template Library (STL)",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055152/Learnova/oxmlxbuoychleg8lcn4q.jpg",
//             "students": 1,
//             "revenue": 1,
//             "avgRating": "3.0",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "Spring Boot",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055620/Learnova/qdzq6wefg4bv5tidgt4g.jpg",
//             "students": 1,
//             "revenue": 1,
//             "avgRating": "4.0",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "Flutter",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055891/Learnova/fkfwpchwoe5rj9z050js.png",
//             "students": 0,
//             "revenue": 0,
//             "avgRating": "0.0",
//             "totalreviewsofcourse": 0,
//             "completionRate": 0
//         },
//         {
//             "coursename": "JavaScript",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759056539/Learnova/pabtqbrxfuboa1i0k9v9.png",
//             "students": 1,
//             "revenue": 1,
//             "avgRating": "3.5",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         }
//     ],
//     "totalCourses": 4,
//     "totalStudents": 3,
//     "totalRevenue": 3,
//     "reviewsSentiment": {
//         "positive": 1,
//         "negative": 0
//     },
//     "instructorOverallRating": "3.5",
//     "instructorOverallreviews": 3
// }