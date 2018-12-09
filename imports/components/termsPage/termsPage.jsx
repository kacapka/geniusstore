import React, {Component} from 'react';
import './termsPage.scss';
import Regulations from "./regulations";
import Payments from "./payments";
import Returns from "./returns";
import Delivery from "./delivery";
import TermsIcons from "./termsIcons";

class TermsPage extends Component {

    renderContent() {
        switch (this.props.tab) {
            case 'delivery':
                return <Delivery />;
            case 'payments':
                return <Payments />;
            case 'returns':
                return <Returns />;
            case 'regulations':
                return <Regulations />;
            default:
                return null;
        }
    }

    render() {
        return (
            <div id='termsPage'>
                <div className='terms-desc'>
                    {this.renderContent()}
                </div>
                   <TermsIcons activeTab={this.props.tab} />
            </div>
        );
    }

}

export default TermsPage;