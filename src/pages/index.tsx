import React, { useState, useRef, useEffect } from "react";
import { addReport } from "../graphql/mutations";
import { getReports } from "../graphql/queries";
import { API } from "aws-amplify";
import { Container, Button, Input, Label, Heading } from 'theme-ui';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  const reportDescRef = useRef<any>("");
  const reportTitleRef = useRef<any>("");
  const reportFirstName = useRef<any>("");
  const reportLastName = useRef<any>("");

  const submitReport = async () => {
    try {
      const report = {
        firstName: reportFirstName.current.value,
        lastName: reportLastName.current.value,
        reportTitle: reportTitleRef.current.value,
        desc: reportDescRef.current.value,
      }
      await API.graphql({
        query: addReport,
        variables: {
          report: report,
        },
      })
      reportFirstName.current.value = ""
      reportLastName.current.value = ""
      reportTitleRef.current.value = ""
      reportDescRef.current.value = ""
      fetchReport();
    } catch (e) {
      console.log(e)
    }
  }

  const fetchReport = async () => {
    try {
      const data = await API.graphql({
        query: getReports,
      })
      setReportData(data);
      console.log(data);
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchReport()
  }, [])

  return (
    <Container>
      {loading ? (
        <Heading sx={{ color: 'black', fontFamily: 'monospace', textAlign: "center" }}>Loading...</Heading>
      ) : (
          <div>
            <Heading sx={{ color: 'black', fontFamily: 'monospace', textAlign: "center" }}>Asynchronous PubSub Demo</Heading>
            <Container p={4} bg='muted'>
              <Label sx={{ color: 'black', fontFamily: 'monospace' }} >Enter your firstName</Label>
              <Input type="text" placeholder="First Name" ref={reportFirstName} /><br />
              <Label sx={{ color: 'black', fontFamily: 'monospace' }} >Enter your lastName</Label>
              <Input type="text" placeholder="Last Name" ref={reportLastName} /><br />
              <Label sx={{ color: 'black', fontFamily: 'monospace' }} >Enter your report title</Label>
              <Input type="text" placeholder="Report Title" ref={reportTitleRef} /><br />
              <Label sx={{ color: 'black', fontFamily: 'monospace' }} >Enter your report description</Label>
              <Input type="text" placeholder="Report Description" ref={reportDescRef} /><br />
              <Button
                sx={{ color: 'red', fontFamily: 'monospace', cursor: 'pointer' }}
                onClick={() => submitReport()}
              >
                Submit Report </Button><br />
            </Container>
            {/* <Heading sx={{ color: 'black', fontFamily: 'monospace', textAlign: "center" }}>BookMark List</Heading> */}
            {/* {repo.data &&
              bookmarkData.data.getBookmark.map((item, ind) => (
                <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={ind}>
                  <Map url={item.url} desc={item.desc} />
                  {/* <p>{item.desc}</p><br />
                  <a href={item.url}>{item.url}</a> */}
                  {/* <div>
                    <Button
                      sx={{ color: 'red', fontFamily: 'monospace', cursor: 'pointer' }}
                      onClick={async e => {
                        e.preventDefault();
                        await API.graphql({
                          query: deleteBookmark,
                          variables: { bookmarkId: item.id },
                        })
                        fetchBookmark();
                      }}
                    >Delete</Button>
                  </div>
                </div>
              // ))} */} 
          </div>
        )}
    </Container>
  )
}