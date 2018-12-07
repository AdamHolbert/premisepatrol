import React from 'react';
import {withFirebase} from "../Firebase/context";
import {withSession} from "../Session/context";
import CommentList from "./CommentList";
import {Fa} from 'mdbreact'

class CommentPage extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        
        this.state = {
            loading: true,
        };
    }
    
    componentDidMount() {
        this.setState({loading: true});
        const {authorId} = this.props.session.state;
        
        const {firebase, commentSectionId} =  this.props;
        this.commentRef = firebase.db.ref(`authorData/${authorId}/commentSections/${commentSectionId}`);
        
        this.commentRef.on('value', comment => {
            console.log(comment.val())
            this.setState({
                loading: false,
                comments:comment.val(),
                resetValues: comment.val()
            })
        });
    }
    
    componentWillUpdate(nextProps, nextState){
        
        // if users have changed
        if(nextState.adminView && (!this.props.session.state.role || !this.props.session.roleCheck('admin|author'))){
            this.setState({adminView: false});
        }
    }
    componentWillUnmount() {
        if(this.commentRef) this.commentRef.off();
        
    }
    
    editToggle = () => this.setState({editing: !this.state.editing});
    
    render() {
        const {loading, error } = this.state;
        const {adminView, commentSectionId} = this.props;
        
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    <Fa icon="refresh" spin size="1x" fixed/> Loading Post...
                </div>
            );
        }
        
        if(error) {
            return (
                <div className='container-fluid text-center h1'>
                    {error.message}
                </div>
            );
        }
        
        return (
            <>
            <CommentList
                adminView={adminView}
                commentSectionId={commentSectionId}
                {...this.state}/>
            </>
        )
    }
}

export default withSession(withFirebase(CommentPage));