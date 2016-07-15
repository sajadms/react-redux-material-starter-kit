import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { FormattedHTMLMessage } from 'react-intl';
import find from 'lodash/find';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Style  from 'material-ui/svg-icons/image/style';
import ActionLanguage  from 'material-ui/svg-icons/action/language';
import Activity from '../../containers/Activity/Activity';
import { setSelectedIndex} from '../../actions/appNavDrawer';
import {setThemeDialogOpen} from '../../actions/appStyle';
import {setIntlDialogOpen} from '../../actions/intl';
import languages from '../../translations/languages';
import themes from '../../themes/themes';
import ThemeDialog from '../../containers/ThemeDialog/ThemeDialog';
import IntlDialog from '../../containers/IntlDialog/IntlDialog';

class MainSettings extends Component{
	
	constructor(props) {
		super(props)	
	};

	render(){
		
		const { intl , appStyle, setThemeDialogOpen, setIntlDialogOpen} = this.props;
		const currentLanguage = find(languages, { key: intl.locale });
		
		
		return (  
	  
			<Activity title={intl.messages.settings} nav_index='/settings' >
			<div>
		      <List>
				<Subheader>{intl.messages.general}</Subheader>
				<ListItem
					leftIcon={<Style />}
					primaryText={intl.messages.theme}
					secondaryText={intl.messages[appStyle.theme.id]}
					onClick={()=>{setThemeDialogOpen(true)}}
				/>
				<ThemeDialog/>
					<Divider inset={true} />
				<ListItem
					leftIcon={<ActionLanguage />}
					primaryText={intl.messages.language}
					secondaryText={intl.messages[currentLanguage.id]}
					onClick={()=>{setIntlDialogOpen(true)}}
				/>
				<IntlDialog/>
			  </List>

			</div>
			</Activity>

		);
	}

};

MainSettings.propTypes = {
	intl: PropTypes.object.isRequired,
	appStyle: PropTypes.object.isRequired,
	setAppBarTitle: PropTypes.func.isRequired,
	setSelectedIndex: PropTypes.func.isRequired,
	setThemeDialogOpen: PropTypes.func.isRequired,
	setIntlDialogOpen: PropTypes.func.isRequired,
}


function mapStateToProps(state) {

	 const {intl, appStyle} = state;

	 return {
			intl:intl,
			appStyle:appStyle,
		 };

}



const mapDispatchToProps = (dispatch) => {
  return {
	setAppBarTitle:(title) => {
		dispatch(setAppBarTitle(title));
	},
	setSelectedIndex:(index) => {
		dispatch(setSelectedIndex(index));
	},
	setThemeDialogOpen:(open) => {
		dispatch(setThemeDialogOpen(open));	
	},
	setIntlDialogOpen:(open) => {
		dispatch(setIntlDialogOpen(open));	
	}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainSettings);