import React from 'react';
import {Editor, EditorState, getDefaultKeyBinding, RichUtils} from 'draft-js';
import Styled from "styled-components";
import {stateToHTML} from 'draft-js-export-html';

import 'draft-js/dist/Draft.css';
import './styles.css';
import '../node_modules/draft-js/dist/Draft.css';

class EmailEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this.send = this._send.bind(this);
    this.sendTo = this._sendTo.bind(this);
    this.checkQuota = this._checkQuota.bind(this);
    this.getHTML = this._getHTML.bind(this);
    this.displayHTML = this._displayHTML.bind(this);
    this.displayHelp = this._displayHelp.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  
  _send()
  { 
    let api = require("./EmailAPI");
    api.send_emails(this.getHTML());
  }

  // Maybe set DEFAULT_EMAIL as an env var?
  _sendTo(email)
  {
    let ans = prompt("Please, enter the addresses you would like to send, seperated by commas.\nE.g: m1@a1.com, m2@a2.net, ...").split(',');
    let api = require("./EmailAPI");
    api.send_custom(ans, this.getHTML())
  }

  _checkQuota()
  {
    let api = require("./EmailAPI");
    api.get_quota();
  }

  _getHTML() {
    let html = stateToHTML(this.state.editorState.getCurrentContent());
    return html; 
  }

  _displayHTML() {
    alert(this.getHTML());
  }

  _displayHelp() {
    let helpString = "Aqukinn mail editor - @rashlight, Ph1eu and UCC\n" + 
    "Common tasks:\n" +
    " - Ctrl + [b/i/u]: Toggle formatting\n" + 
    " - Send: Send this mail to the default recipients\n" + 
    " - Send to: Like Send, but to specified email(s)\n" + 
    " - Check Quota: Get the remaining mail that this account can send\n" + 
    "For help and resources, please see the GitHub repository.";

    alert(helpString);
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'EmailEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' EmailEditor-hidePlaceholder';
      }
    }

    return (
      <div className="EmailEditor-root">
        <HeaderStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <span id="EmailEditor-seperator">||&emsp;</span>
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <span id="EmailEditor-seperator">||&emsp;</span>
        <FormatStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Enter your email contents here..."
            ref="editor"
            spellCheck={true}
          />
        </div>

        <div className="EmailEditor-features">
          <Button id="EmailEditor-featureButton" onClick={this.send}>SEND</Button>
          <span>&ensp;</span>
          <Button id="EmailEditor-featureButton" onClick={this.sendTo}>Send to...</Button>
          <span>&ensp;</span>
          <Button id="EmailEditor-featureButton" onClick={this.checkQuota}>Check Quota...</Button>
          <span>&ensp;</span>
          <Button id="EmailEditor-featureButton" onClick={this.displayHTML}>Show HTML...</Button>
          <span>&ensp;</span>
          <Button id="EmailEditor-featureButton" onClick={this.displayHelp}>Help & About...</Button>
        </div>
      </div>
    );
  }  
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'EmailEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  
  render() {
    let className = 'EmailEditor-styleButton';
    if (this.props.active) {
      className += ' EmailEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const HEADER_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
];

const HeaderStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="EmailEditor-header-controls">
      {HEADER_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const FORMAT_TYPES = [
  {label: 'Quote', style: 'blockquote'},
  {label: 'Bullet Points', style: 'unordered-list-item'},
  {label: 'Numbered List', style: 'ordered-list-item'},
  {label: 'Code', style: 'code-block'},
];

const FormatStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="EmailEditor-format-controls">
      {FORMAT_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="EmailEditor-inline-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const theme = {
  gold: {
    default: "#A3883B", // paradisepink
    hover: "#DAA520" // goldenrod
  },
};

const Button = Styled.button
`
  background-color: ${(props) => theme[props.theme].default};

  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "gold"
};

export default EmailEditor;