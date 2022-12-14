import * as React from 'react'
import './App.css'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import NestedRoute from './pages/NestedRoute'
import ErrorBoundary from './pages/ErrorBoundary'
import Navigation from './pages/Navigation'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import useFetch from './useFetch';


function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

function GitHub() {
  const [user, setUser] = React.useState([])
  const handleError = useErrorHandler()

  React.useEffect(()=> {

    async function fetc(){

      const response = await axios.get('https://randomuser.me/api/?results=500')
    return response.data.result
    }
setUser(fetc())

  })
  React.useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get('https://randomuser.me/api/?results=5000',{dataType: 'json'})
        console.log(res)
        setUser(data)
      } catch (err) {
        console.log(err)
        handleError(err)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
      <h1>GitHub</h1>
      {user?.login && <span>API call was successful</span>}
    </>
  )
}

function App() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
 
  console.log({ loading, error, data });

  // step1
  const PER_PAGE = 5;
  // step2
  const total = data?.results?.length;
  // step3
  const pages = 50;
 
  const skip = page * PER_PAGE - PER_PAGE;
  // console.log(skip, total);

  // use the useEffect to make api call based on the page.

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }
    
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="nestedroute" element={<NestedRoute />} />
          <Route path="errorboundary" element={<ErrorBoundary />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />

      </Routes>
      


      <div className="App">
      <h1 className="title">List of Users</h1>
      {/* TODO: another magic with Array.slice() */}
      {/* slice(0, 10) */}
      {/* slice(10, 20) */}
      {/* slice(20, 30) */}

      {/* 0, 0 + 5 slice(0, 5)*/}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {/* 0, 1*10 */}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {data?.results
        // .slice(skip, skip + PER_PAGE)
        // .slice((page - 1) * PER_PAGE, page * PER_PAGE)
        .map((each, index) => {
          const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
          return (
            <li key={name.toLowerCase().replaceAll(' ', '')}>{`${
              index + 1
            }.${name}`}</li>
          );
        })}
      {
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          prev
        </button>
      }
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
      {
        <button
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </button>
      }
      {/* another magic here */}
      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button onClick={() => setPage(each)}>{each}</button>
        )
      )}
    </div>

    </>
  )
}

export default App
