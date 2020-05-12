import React from "react";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";
import PropTypes from 'prop-types'
import ErrorBoundry from '../ErrorBoundry'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    
    const note = findNote(notes, noteId) || { content: "" };
    return (
		<ErrorBoundry>
			<section className="NotePageMain">
				<Note
					id={note.id}
					note_name={note.note_name}
					modified={note.modified}
					onDeleteNote={this.handleDeleteNote}
				/>
				<div className="NotePageMain__content">
					{note.content.split(/\n \r|\n/).map((para, i) => (
						<p key={i}>{para}</p>
					))}
				</div>
			</section>
		</ErrorBoundry>
	);
  }
}
NotePageMain.propTypes = {
  match: PropTypes.object.isRequired
}