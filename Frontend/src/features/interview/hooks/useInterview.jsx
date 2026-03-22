import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useNavigate, useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()
    const navigate = useNavigate()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const handleAuthError = (error) => {
        if (error?.response?.status === 401) {
            setReport(null)
            setReports([])
            navigate("/login", { replace: true })
            return true
        }
        return false
    }

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            const reportData = response?.interviewReport ?? null
            setReport(reportData)
            return reportData
        } catch (error) {
            if (!handleAuthError(error)) {
                console.error("generateReport failed", error)
            }
            setReport(null)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            const reportData = response?.interviewReport ?? null
            setReport(reportData)
            return reportData
        } catch (error) {
            if (!handleAuthError(error)) {
                console.error("getReportById failed", error)
            }
            setReport(null)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            const reportsData = response?.interviewReports ?? []
            setReports(reportsData)
            return reportsData
        } catch (error) {
            if (!handleAuthError(error)) {
                console.error("getReports failed", error)
            }
            setReports([])
            return []
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            if (!handleAuthError(error)) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}

export default useInterview
