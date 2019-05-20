import React, { Component } from 'react';
import {
    MDBIcon,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
} from 'mdbreact';
import { withTranslation } from 'react-i18next';
import { loadState, saveState } from "../storage/storage";
import {locales} from "../config/i18n";
import i18n from 'i18next';
class Translator extends Component{

    componentWillMount() {

    }

    changeLanguage1 (code) {
        i18n.changeLanguage(code);
        saveState('state', code);
        console.log(loadState("state"));
    }

    render() {
        return (
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <MDBIcon icon="globe"/> <span className="d-none d-md-inline">{ this.props.t('language')}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu right style={{minWidth: '200px'}}>
                    {locales.map(locale => (
                        <MDBDropdownItem key={locale.code} onClick={() => this.changeLanguage1(locale.code)}>
                            {locale.name}
                        </MDBDropdownItem>
                    ))}
                </MDBDropdownMenu>
            </MDBDropdown>
        );

    }
}

export default withTranslation('common')(Translator)

