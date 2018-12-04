import React from 'react';
import tempImg from '../../temp.png';
import { Card, CardBody, CardTitle, CardText, Col, Row} from 'mdbreact';

const AuthorCard = ({adminView, authorUrl, authorTitle, authorImg, authorDescription, showTempImg,
                        imgFunction, peeking, error, peek, editFunction, deleteFunction, brokenImg}) => (
    <Card className='unselectable-text'>
        {peeking ?
            <div className='w-100 p-0 m-0 mb-1 p-0 rounded-top unrounded-bottom'>
                <div className="btn btn-dark rounded-1 unrounded-right unrounded-bottom m-0 p-1 flex-center"
                     onClick={peek}>
                    End peek
                </div>
            </div>
            : adminView &&
            <Row className='w-100 p-0 m-0 mb-1 p-0 rounded-top unrounded-bottom'>
                <Col size={7} className="m-0 p-0">
                    <div className="btn btn-dark rounded-1 unrounded-right unrounded-bottom m-0 p-1 flex-center"
                        onClick={editFunction}>
                        Edit author
                    </div>
                </Col>
                <Col size={5} className="m-0 p-0">
                    <div className="btn btn-danger rounded-1 unrounded-left unrounded-bottom m-0 p-1 flex-center"
                        onClick={deleteFunction}>
                        Delete
                    </div>
                </Col>
            </Row>
        }
        <div className={"embed-responsive embed-responsive-4by3 view overlay hoverable " +
        (adminView ? '' : 'rounded-top')} onClick={imgFunction}>
            <img
                className="img-fluid heavy-rain-gradient embed-responsive-item"
                src={brokenImg ? tempImg : authorImg} alt={''} onError={showTempImg}
            />
            <div className='mask rgba-blue-grey-strong flex-center'>
                <div className='h6 text-dark alert-dark p-2 rounded'>
                    Visit author page
                </div>
            </div>
        </div>
        <CardBody className='pt-1'>
            {error &&
            <CardText className='alert-danger text-center' tag='div'>
                {error.error}
            </CardText>
            }
            <div className="url-label m-0">/A/{authorUrl}</div>
            <CardTitle className=''>{authorTitle}</CardTitle>
            <CardText tag='div' style={{'whiteSpace': 'pre-line'}} >
                {authorDescription}
            </CardText>
        </CardBody>
    </Card>
);

export default AuthorCard;