// 404 Error Page Style File Path: public/css/pages-and-components-css/error.scss

import React from 'react';
import Link from 'next/link';
import axios from 'axios'
import baseApiUrl from '@/utils/baseApiUrl'

const ErrorPage = () => {

	const [error, setError] = React.useState()
    React.useEffect(() => {
        const getError = async () => {
            const response = await axios.get(`${baseApiUrl}/404-error-page`)
            setError(response.data)
            // console.log(response.data)
        }
        getError()
    }, [])

    return (
		<>
			<div className="error-area ptb-100">
				<div className="d-table">
					<div className="d-table-cell">
						<div className="container">
							{error && (
								<div className="error-content">
									<img 
										src={error.image.url} 
										alt={error.image.alternativeText} 
									/>

									<p>{error.shortDec}</p>

									<Link href={error.btnUrl}>
										<a className="default-btn">{error.btn}</a>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
    )
}

export default ErrorPage;