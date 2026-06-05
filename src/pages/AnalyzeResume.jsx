import { useState } from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaFilePdf,
  FaHistory,
  FaChartBar,
  FaTachometerAlt
} from "react-icons/fa";

import { CircularProgressbar }
from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import api from "../services/api";

import { useAuth }
from "../context/AuthContext";

function AnalyzeResume() {

  const { resumeId } =
    useParams();

  const {
    token,
    user
  } =
    useAuth();

  const [jobDescription,
    setJobDescription] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [result,
    setResult] =
    useState(null);

  const handleAnalyze =
    async () => {

      if (!jobDescription.trim()) {

        return alert(
          "Please paste a Job Description"
        );

      }

      try {

        setLoading(true);

        const response =
          await api.post(
            "/ats/analyze",
            {
              resumeId,
              jobDescription
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const report = response.data.report;

        setResult(report);

        localStorage.setItem(
          "latestReportId",
          response.data.report._id
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Analysis Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-blue-50
      via-white
      to-purple-50
      p-8
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
      "
      >

        {/* HEADER */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
        "
        >

          <div>

            <h1
              className="
              text-5xl
              font-black
            "
            >
              Welcome Back, 👋
            </h1>

            <p
              className="
              text-gray-600
              mt-2
            "
            >
              ATS Score Analysis
            </p>

          </div>

          {
            user?.profileImage ? (

              <img
                src={user.profileImage}
                alt="Profile"
                className="
                w-14
                h-14
                rounded-full
                border-2
                border-white
                shadow
                object-cover
              "
              />

            ) : (

              <div
                className="
                w-14
                h-14
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-lg
                shadow
              "
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

            )
          }

        </div>

        {/* MAIN GRID */}

        <div
          className="
          grid
          lg:grid-cols-2
          gap-6
        "
        >

          {/* LEFT PANEL */}

          <div
            className="
            bg-white/80
            backdrop-blur-md
            rounded-3xl
            shadow-lg
            p-6
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-4
            "
            >
              Resume
            </h2>

            <div
              className="
              flex
              items-center
              gap-4
              mb-6
            "
            >

              <FaFilePdf
                className="
                text-red-500
                text-6xl
              "
              />

              <div>

                <p
                  className="
                  font-bold
                "
                >
                  Resume Selected
                </p>

                <p
                  className="
                  text-gray-500
                  text-sm
                "
                >
                  Resume ID:
                  {resumeId.slice(0, 8)}...
                </p>

              </div>

            </div>

            <h3
              className="
              text-lg
              font-semibold
              mb-3
            "
            >
              Paste Job Description
            </h3>

            <textarea
              rows="10"
              value={
                jobDescription
              }
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              placeholder="Paste Job Description Here..."
              className="
              w-full
              border
              rounded-xl
              p-4
              resize-none
              outline-none
            "
            />

            <button
              onClick={
                handleAnalyze
              }
              disabled={
                loading
              }
              className="
              mt-5
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
            "
            >
              {
                loading
                  ? "Analyzing..."
                  : "Check Score"
              }
            </button>

          </div>

          {/* RIGHT PANEL */}

          <div
            className="
            bg-white/80
            backdrop-blur-md
            rounded-3xl
            shadow-lg
            p-6
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-6
            "
            >
              ATS Score Analysis
            </h2>

            {
              result ? (

                <>

                  <div
                    className="
                    w-48
                    h-48
                    mx-auto
                    mb-8
                  "
                  >

                    <CircularProgressbar
                      value={result.score}
                      text={`${result.score}%`}
                    />

                  </div>

                  <div
                    className="
                    mt-6
                    mb-6
                    flex
                    justify-center
                  "
                  >

                    <span
                      className={
                        `
                      px-6
                      py-2
                      rounded-full
                      font-bold
                      text-lg

                      ${
                        result.score >= 80
                          ? "bg-green-100 text-green-700"
                          : result.score >= 60
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `
                      }
                    >
                      ATS Grade: {result.atsGrade}
                    </span>

                  </div>

                  <div
                    className="
                    bg-blue-50
                    rounded-2xl
                    p-5
                    mb-6
                  "
                  >

                    <h3
                      className="
                      text-lg
                      font-bold
                      mb-2
                    "
                    >
                      AI Summary
                    </h3>

                    <p
                      className="
                      text-gray-700
                    "
                    >
                      {result.summary}
                    </p>

                    <div
                      className="
                      mt-4
                      grid
                      grid-cols-3
                      gap-4
                    "
                    >

                      <div
                        className="
                        bg-green-50
                        p-4
                        rounded-xl
                        text-center
                      "
                      >
                        <div className="font-bold">
                          {result.matchedKeywords?.length}
                        </div>

                        <div className="text-sm">
                          Matched
                        </div>
                      </div>

                      <div
                        className="
                        bg-red-50
                        p-4
                        rounded-xl
                        text-center
                      "
                      >
                        <div className="font-bold">
                          {result.missingKeywords?.length}
                        </div>

                        <div className="text-sm">
                          Missing
                        </div>
                      </div>

                      <div
                        className="
                        bg-blue-50
                        p-4
                        rounded-xl
                        text-center
                      "
                      >
                        <div className="font-bold">
                          {result.score}%
                        </div>

                        <div className="text-sm">
                          ATS Score
                        </div>
                      </div>

                    </div>

                  </div>

                  <div
                    className="
                    border
                    rounded-xl
                    overflow-hidden
                    mb-6
                  "
                  >

                    <h3
                      className="
                      text-lg
                      font-bold
                      mb-4
                    "
                    >
                      Formatting Analysis
                    </h3>

                    {
                      Object.entries(result.formattingAnalysis || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="
                            grid
                            grid-cols-2
                            border-b
                          "
                          >

                            <div
                              className="
                              p-3
                              capitalize
                            "
                            >
                              {key}
                            </div>

                            <div
                              className={`
                              p-3
                              font-semibold
                              ${value ? "text-green-600" : "text-red-600"}
                            `}
                            >
                              {value ? "Pass" : "Fail"}
                            </div>

                          </div>
                        )
                      )
                    }

                  </div>

                  <h3
                    className="
                    text-lg
                    font-bold
                    mb-4
                  "
                  >
                    Skill Alignment
                    ({result.skillAlignment?.length} Skills)
                  </h3>

                  <div
                    className="
                    space-y-4
                    mb-6
                  "
                  >

                    {
                      result.skillAlignment?.map((skill, index) => (
                        <div
                          key={index}
                        >

                          <div
                            className="
                            flex
                            justify-between
                          "
                          >

                            <span>{skill.skill}</span>

                            <span>{skill.percentage}%</span>

                          </div>

                          <div
                            className="
                            bg-gray-200
                            rounded-full
                            h-3
                            mt-1
                          "
                          >

                            <div
                              className="
                              bg-blue-600
                              h-3
                              rounded-full
                            "
                              style={{
                                width: `${skill.percentage}%`
                              }}
                            />

                          </div>

                        </div>
                      ))
                    }

                  </div>

                </>

              ) : (

                <div
                  className="
                  text-center
                  text-gray-500
                  py-20
                "
                >
                  Analyze a resume to see ATS insights.
                </div>


              )
            }

          </div>

        </div>
        {/* RESULTS */}

        {
          result && (

            <div
              className="
              grid
              lg:grid-cols-2
              gap-6
              mt-8
            "
            >

              <div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              "
              >

                <h3
                  className="
                  text-green-600
                  text-xl
                  font-bold
                  mb-4
                "
                >
                  Strengths
                </h3>

                {
                  result.strengths?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                        bg-green-50
                        p-3
                        rounded-xl
                        mb-3
                      "
                      >
                        ✓ {item}
                      </div>

                    )
                  )
                }

              </div>

              <div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              "
              >

                <h3
                  className="
                  text-red-600
                  text-xl
                  font-bold
                  mb-4
                "
                >
                  Weaknesses
                </h3>

                {
                  result.weaknesses?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                        bg-red-50
                        p-3
                        rounded-xl
                        mb-3
                      "
                      >
                        ✗ {item}
                      </div>

                    )
                  )
                }

              </div>

              {/* MATCHED */}

              <div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              "
              >

                <h3
                  className="
                  text-green-600
                  font-bold
                  text-xl
                  mb-4
                  flex
                  items-center
                  gap-2
                "
                >

                  <FaCheckCircle />

                  Matched Keywords

                </h3>

                <div
                  className="
                  flex
                  flex-wrap
                  gap-2
                "
                >

                  {
                    result.matchedKeywords?.map(
                      (
                        keyword,
                        index
                      ) => (

                        <span
                          key={index}
                          className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-2
                          rounded-full
                        "
                        >
                          {keyword}
                        </span>

                      )
                    )
                  }

                </div>

              </div>

              {/* MISSING */}

              <div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              "
              >

                <h3
                  className="
                  text-red-600
                  font-bold
                  text-xl
                  mb-4
                  flex
                  items-center
                  gap-2
                "
                >

                  <FaTimesCircle />

                  Missing Keywords

                </h3>

                <div
                  className="
                  flex
                  flex-wrap
                  gap-2
                "
                >

                  {
                    result.missingKeywords?.map(
                      (
                        keyword,
                        index
                      ) => (

                        <span
                          key={index}
                          className="
                          bg-red-100
                          text-red-700
                          px-3
                          py-2
                          rounded-full
                        "
                        >
                          {keyword}
                        </span>

                      )
                    )
                  }

                </div>

              </div>

              {/* SUGGESTIONS */}

              <div
                className="
                lg:col-span-2
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              "
              >

                <h3
                  className="
                  text-yellow-600
                  font-bold
                  text-xl
                  mb-4
                  flex
                  items-center
                  gap-2
                "
                >

                  <FaLightbulb />

                  Suggestions

                </h3>

                <ul
                  className="
                  space-y-3
                "
                >

                  {
                    result.suggestions?.length > 0 ? (

                      result.suggestions.map(
                        (
                          suggestion,
                          index
                        ) => (

                          <li
                            key={index}
                            className="
                            bg-yellow-50
                            p-4
                            rounded-xl
                          "
                          >
                            {suggestion}
                          </li>

                        )
                      )

                    ) : (

                      <li
                        className="
                        text-gray-500
                      "
                      >
                        No suggestions available
                      </li>

                    )
                  }

                </ul>

              </div>

            </div>

          )
        }

        {/* NAVIGATION */}

        <div
          className="
          grid
          md:grid-cols-4
          gap-4
          mt-10
        "
        >

          <Link
            to="/upload-resume"
            className="
            bg-white
            shadow
            rounded-xl
            p-4
            flex
            items-center
            gap-3
          "
          >
            <FaFilePdf />
            Upload Resume
          </Link>

          <Link
            to="/resume-history"
            className="
            bg-white
            shadow
            rounded-xl
            p-4
            flex
            items-center
            gap-3
          "
          >
            <FaHistory />
            Resume History
          </Link>

          <Link
            to="/reports"
            className="
            bg-white
            shadow
            rounded-xl
            p-4
            flex
            items-center
            gap-3
          "
          >
            <FaChartBar />
            ATS Reports
          </Link>

          <Link
            to="/dashboard"
            className="
            bg-white
            shadow
            rounded-xl
            p-4
            flex
            items-center
            gap-3
          "
          >
            <FaTachometerAlt />
            Dashboard
          </Link>

        </div>

      </div>

    </div>

  );

}

export default AnalyzeResume;