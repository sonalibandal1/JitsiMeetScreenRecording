// @flow

import React from 'react';
import { Alert, NativeModules, SafeAreaView, ScrollView, Switch, Text, TextInput, View } from 'react-native';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { translate } from '../../../base/i18n';
import { HeaderWithNavigation, Modal } from '../../../base/react';
import { connect } from '../../../base/redux';

import {
    AbstractSettingsView,
    _mapStateToProps as _abstractMapStateToProps,
    type Props as AbstractProps
} from '../AbstractSettingsView';
import { setSettingsViewVisible } from '../../actions';
import FormRow from './FormRow';
import FormSectionHeader from './FormSectionHeader';
import { normalizeUserInputURL } from '../../functions';
import styles from './styles';

/**
 * Application information module.
 */
const { AppInfo } = NativeModules;

type Props = AbstractProps & {

    /**
     * Color schemed style of the header component.
     */
    _headerStyles: Object
}

type State = {

    /**
     * Whether to show advanced settings or not.
     */
    showAdvanced: boolean
}

/**
 * The native container rendering the app settings page.
 *
 * @extends AbstractSettingsView
 */
class SettingsView extends AbstractSettingsView<Props, State> {
    _urlField: Object;

    /**
     * Initializes a new {@code SettingsView} instance.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state = {
            showAdvanced: false
        };

        // Bind event handlers so they are only bound once per instance.
        this._onBlurServerURL = this._onBlurServerURL.bind(this);
        this._onDisableCallIntegration = this._onDisableCallIntegration.bind(this);
        this._onDisableP2P = this._onDisableP2P.bind(this);
        this._onRequestClose = this._onRequestClose.bind(this);
        this._onShowAdvanced = this._onShowAdvanced.bind(this);
        this._setURLFieldReference = this._setURLFieldReference.bind(this);
        this._showURLAlert = this._showURLAlert.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}, renders the settings page.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Modal
                onRequestClose = { this._onRequestClose }
                presentationStyle = 'overFullScreen'
                visible = { this.props._visible }>
                <View style = { this.props._headerStyles.page }>
                    { this._renderHeader() }
                    { this._renderBody() }
                </View>
            </Modal>
        );
    }

    _onBlurServerURL: () => void;

    /**
     * Handler the server URL lose focus event. Here we validate the server URL
     * and update it to the normalized version, or show an error if incorrect.
     *
     * @private
     * @returns {void}
     */
    _onBlurServerURL() {
        this._processServerURL(false /* hideOnSuccess */);
    }

    _onChangeDisplayName: (string) => void;

    _onChangeEmail: (string) => void;

    _onChangeServerURL: (string) => void;

    _onDisableCallIntegration: (boolean) => void;

    /**
     * Handles the disable call integration change event.
     *
     * @param {boolean} newValue - The new value
     * option.
     * @private
     * @returns {void}
     */
    _onDisableCallIntegration(newValue) {
        this._updateSettings({
            disableCallIntegration: newValue
        });
    }

    _onDisableP2P: (boolean) => void;

    /**
     * Handles the disable P2P change event.
     *
     * @param {boolean} newValue - The new value
     * option.
     * @private
     * @returns {void}
     */
    _onDisableP2P(newValue) {
        this._updateSettings({
            disableP2P: newValue
        });
    }

    _onRequestClose: () => void;

    /**
     * Handles the back button. Also invokes normalizeUserInputURL to validate
     * the URL entered by the user.
     *
     * @returns {void}
     */
    _onRequestClose() {
        this.setState({ showAdvanced: false });
        this._processServerURL(true /* hideOnSuccess */);
    }

    _onShowAdvanced: () => void;

    /**
     * Handles the advanced settings button.
     *
     * @returns {void}
     */
    _onShowAdvanced() {
        this.setState({ showAdvanced: !this.state.showAdvanced });
    }

    _onStartAudioMutedChange: (boolean) => void;

    _onStartVideoMutedChange: (boolean) => void;

    /**
     * Processes the server URL. It normalizes it and an error alert is
     * displayed in case it's incorrect.
     *
     * @param {boolean} hideOnSuccess - True if the dialog should be hidden if
     * normalization / validation succeeds, false otherwise.
     * @private
     * @returns {void}
     */
    _processServerURL(hideOnSuccess: boolean) {
        const { serverURL } = this.props._settings;
        const normalizedURL = normalizeUserInputURL(serverURL);

        if (normalizedURL === null) {
            this._showURLAlert();
        } else {
            this._onChangeServerURL(normalizedURL);
            if (hideOnSuccess) {
                this.props.dispatch(setSettingsViewVisible(false));
            }
        }
    }

    /**
     * Renders the advanced settings options.
     *
     * @private
     * @returns {React$Element}
     */
    _renderAdvancedSettings() {
        const { _settings } = this.props;
        const { showAdvanced } = this.state;

        if (!showAdvanced) {
            return (
                <FormRow
                    fieldSeparator = { true }
                    label = 'settingsView.showAdvanced'>
                    <Switch
                        onValueChange = { this._onShowAdvanced }
                        value = { showAdvanced } />
                </FormRow>
            );
        }

        return (
            <>
                <FormRow
                    fieldSeparator = { true }
                    label = 'settingsView.disableCallIntegration'>
                    <Switch
                        onValueChange = { this._onDisableCallIntegration }
                        value = { _settings.disableCallIntegration } />
                </FormRow>
                <FormRow
                    fieldSeparator = { true }
                    label = 'settingsView.disableP2P'>
                    <Switch
                        onValueChange = { this._onDisableP2P }
                        value = { _settings.disableP2P } />
                </FormRow>
            </>
        );
    }

    /**
     * Renders the body (under the header) of {@code SettingsView}.
     *
     * @private
     * @returns {React$Element}
     */
    _renderBody() {
        const { _settings } = this.props;

        return (
            <SafeAreaView style = { styles.settingsForm }>
                <ScrollView>
                    <FormSectionHeader
                        label = 'settingsView.profileSection' />
                    <FormRow
                        fieldSeparator = { true }
                        label = 'settingsView.displayName'>
                        <TextInput
                            autoCorrect = { false }
                            onChangeText = { this._onChangeDisplayName }
                            placeholder = 'John Doe'
                            value = { _settings.displayName } />
                    </FormRow>
                    <FormRow label = 'settingsView.email'>
                        <TextInput
                            autoCapitalize = 'none'
                            autoCorrect = { false }
                            keyboardType = { 'email-address' }
                            onChangeText = { this._onChangeEmail }
                            placeholder = 'email@example.com'
                            value = { _settings.email } />
                    </FormRow>
                    <FormSectionHeader
                        label = 'settingsView.conferenceSection' />
                    <FormRow
                        fieldSeparator = { true }
                        label = 'settingsView.serverURL'>
                        <TextInput
                            autoCapitalize = 'none'
                            editable = {false}
                            autoCorrect = { false }
                            onBlur = { this._onBlurServerURL }
                            onChangeText = { this._onChangeServerURL }
                            placeholder = { this.props._serverURL }
                            value = { _settings.serverURL } />
                    </FormRow>
                    <FormRow
                        fieldSeparator = { true }
                        label = 'settingsView.startWithAudioMuted'>
                        <Switch
                            onValueChange = { this._onStartAudioMutedChange }
                            value = { _settings.startWithAudioMuted } />
                    </FormRow>
                    <FormRow label = 'settingsView.startWithVideoMuted'>
                        <Switch
                            onValueChange = { this._onStartVideoMutedChange }
                            value = { _settings.startWithVideoMuted } />
                    </FormRow>
                    <FormSectionHeader
                        label = 'settingsView.buildInfoSection' />
                    <FormRow
                        label = 'settingsView.version'>
                        <Text>
                            { `${AppInfo.version} build ${AppInfo.buildNumber}` }
                        </Text>
                    </FormRow>
                    {/* <FormSectionHeader
                        label = 'settingsView.advanced' />
                    { this._renderAdvancedSettings() } */}
                </ScrollView>
            </SafeAreaView>
        );
    }

    /**
     * Renders the header of {@code SettingsView}.
     *
     * @private
     * @returns {React$Element}
     */
    _renderHeader() {
        return (
            <HeaderWithNavigation
                headerLabelKey = 'settingsView.header'
                onPressBack = { this._onRequestClose } />
        );
    }

    _setURLFieldReference: (React$ElementRef<*> | null) => void;

    /**
     *  Stores a reference to the URL field for later use.
     *
     * @param {Object} component - The field component.
     * @protected
     * @returns {void}
     */
    _setURLFieldReference(component) {
        this._urlField = component;
    }

    _showURLAlert: () => void;

    /**
     * Shows an alert telling the user that the URL he/she entered was invalid.
     *
     * @returns {void}
     */
    _showURLAlert() {
        const { t } = this.props;

        Alert.alert(
            t('settingsView.alertTitle'),
            t('settingsView.alertURLText'),
            [
                {
                    onPress: () => this._urlField.focus(),
                    text: t('settingsView.alertOk')
                }
            ]
        );
    }

    _updateSettings: (Object) => void;
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _headerStyles: Object
 * }}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')
    };
}

export default translate(connect(_mapStateToProps)(SettingsView));
