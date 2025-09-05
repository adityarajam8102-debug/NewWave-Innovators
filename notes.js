// Notes Management System
class NotesManager {
    constructor() {
        this.notes = this.loadNotes();
        this.currentCourseId = null;
        this.noteIdCounter = this.getNextNoteId();
        this.searchTimeout = null;
    }

    // Load notes from localStorage
    loadNotes() {
        try {
            const stored = localStorage.getItem('courseNotes');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading notes:', error);
            return {};
        }
    }

    // Save notes to localStorage
    saveNotes() {
        try {
            localStorage.setItem('courseNotes', JSON.stringify(this.notes));
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    }

    // Get next note ID
    getNextNoteId() {
        const allNotes = Object.values(this.notes).flat();
        return allNotes.length > 0 ? Math.max(...allNotes.map(n => n.id)) + 1 : 1;
    }

    // Get notes for a specific course
    getCourseNotes(courseId) {
        return this.notes[courseId] || [];
    }

    // Add a new note
    addNote(courseId, title, content, category = 'general') {
        if (!this.notes[courseId]) {
            this.notes[courseId] = [];
        }

        const note = {
            id: this.noteIdCounter++,
            title: title.trim(),
            content: content.trim(),
            category: category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isPinned: false,
            tags: this.extractTags(content)
        };

        this.notes[courseId].unshift(note);
        this.saveNotes();
        return note;
    }

    // Update an existing note
    updateNote(courseId, noteId, title, content, category) {
        const courseNotes = this.notes[courseId];
        if (!courseNotes) return false;

        const noteIndex = courseNotes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) return false;

        courseNotes[noteIndex] = {
            ...courseNotes[noteIndex],
            title: title.trim(),
            content: content.trim(),
            category: category,
            updatedAt: new Date().toISOString(),
            tags: this.extractTags(content)
        };

        this.saveNotes();
        return true;
    }

    // Delete a note
    deleteNote(courseId, noteId) {
        const courseNotes = this.notes[courseId];
        if (!courseNotes) return false;

        const noteIndex = courseNotes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) return false;

        courseNotes.splice(noteIndex, 1);
        this.saveNotes();
        return true;
    }

    // Toggle pin status
    togglePin(courseId, noteId) {
        const courseNotes = this.notes[courseId];
        if (!courseNotes) return false;

        const note = courseNotes.find(n => n.id === noteId);
        if (!note) return false;

        note.isPinned = !note.isPinned;
        
        // Sort notes - pinned first
        this.notes[courseId] = courseNotes.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        this.saveNotes();
        return true;
    }

    // Search notes
    searchNotes(courseId, query) {
        const courseNotes = this.getCourseNotes(courseId);
        if (!query.trim()) return courseNotes;

        const searchTerm = query.toLowerCase().trim();
        return courseNotes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Filter notes by category
    filterByCategory(courseId, category) {
        const courseNotes = this.getCourseNotes(courseId);
        if (category === 'all') return courseNotes;
        return courseNotes.filter(note => note.category === category);
    }

    // Extract tags from content (words starting with #)
    extractTags(content) {
        const tagRegex = /#(\w+)/g;
        const tags = [];
        let match;
        while ((match = tagRegex.exec(content)) !== null) {
            tags.push(match[1]);
        }
        return [...new Set(tags)]; // Remove duplicates
    }

    // Get all unique categories for a course
    getCategories(courseId) {
        const courseNotes = this.getCourseNotes(courseId);
        const categories = [...new Set(courseNotes.map(note => note.category))];
        return ['all', ...categories];
    }

    // Get statistics
    getStats(courseId) {
        const courseNotes = this.getCourseNotes(courseId);
        return {
            total: courseNotes.length,
            pinned: courseNotes.filter(n => n.isPinned).length,
            categories: this.getCategories(courseId).length - 1, // Exclude 'all'
            lastUpdated: courseNotes.length > 0 ? 
                Math.max(...courseNotes.map(n => new Date(n.updatedAt))) : null
        };
    }
}

// Initialize global notes manager
window.notesManager = new NotesManager();

// Notes UI Functions
function openNotesModal(courseId, courseName) {
    window.notesManager.currentCourseId = courseId;
    
    const modal = createNotesModal(courseId, courseName);
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    renderNotesList(courseId);
    updateNotesStats(courseId);
}

function createNotesModal(courseId, courseName) {
    const modal = document.createElement('div');
    modal.className = 'notes-modal modal';
    modal.id = `notesModal${courseId}`;
    
    modal.innerHTML = `
        <div class="modal-content notes-modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-sticky-note"></i> Notes - ${courseName}</h3>
                <span class="close" onclick="closeNotesModal('${courseId}')">&times;</span>
            </div>
            <div class="notes-container">
                <div class="notes-sidebar">
                    <div class="notes-stats" id="notesStats${courseId}">
                        <div class="stat-item">
                            <span class="stat-number" id="totalNotes${courseId}">0</span>
                            <span class="stat-label">Total Notes</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="pinnedNotes${courseId}">0</span>
                            <span class="stat-label">Pinned</span>
                        </div>
                    </div>
                    
                    <div class="notes-controls">
                        <button class="btn btn-primary" onclick="showAddNoteForm('${courseId}')">
                            <i class="fas fa-plus"></i> New Note
                        </button>
                        
                        <div class="search-box">
                            <input type="text" id="notesSearch${courseId}" placeholder="Search notes..." 
                                   oninput="searchNotes('${courseId}', this.value)">
                            <i class="fas fa-search"></i>
                        </div>
                        
                        <div class="category-filter">
                            <select id="categoryFilter${courseId}" onchange="filterNotes('${courseId}', this.value)">
                                <option value="all">All Categories</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="notes-main">
                    <div class="notes-list" id="notesList${courseId}">
                        <!-- Notes will be rendered here -->
                    </div>
                    
                    <div class="note-form" id="noteForm${courseId}" style="display: none;">
                        <h4 id="noteFormTitle${courseId}">Add New Note</h4>
                        <input type="hidden" id="noteId${courseId}" value="">
                        
                        <div class="form-group">
                            <input type="text" id="noteTitle${courseId}" placeholder="Note title..." maxlength="100">
                        </div>
                        
                        <div class="form-group">
                            <select id="noteCategory${courseId}">
                                <option value="general">General</option>
                                <option value="lecture">Lecture</option>
                                <option value="assignment">Assignment</option>
                                <option value="exam">Exam</option>
                                <option value="project">Project</option>
                                <option value="research">Research</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <textarea id="noteContent${courseId}" placeholder="Write your note here... Use #tags for organization" rows="10"></textarea>
                            <div class="textarea-footer">
                                <span class="char-count" id="charCount${courseId}">0 characters</span>
                                <span class="tip">Tip: Use #hashtags to organize your notes</span>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button class="btn btn-primary" onclick="saveNote('${courseId}')">
                                <i class="fas fa-save"></i> Save Note
                            </button>
                            <button class="btn btn-secondary" onclick="cancelNoteForm('${courseId}')">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function renderNotesList(courseId) {
    const notesList = document.getElementById(`notesList${courseId}`);
    const searchQuery = document.getElementById(`notesSearch${courseId}`)?.value || '';
    const categoryFilter = document.getElementById(`categoryFilter${courseId}`)?.value || 'all';
    
    let notes = window.notesManager.getCourseNotes(courseId);
    
    // Apply filters
    if (searchQuery) {
        notes = window.notesManager.searchNotes(courseId, searchQuery);
    }
    if (categoryFilter !== 'all') {
        notes = notes.filter(note => note.category === categoryFilter);
    }
    
    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note fa-3x"></i>
                <h4>No notes yet</h4>
                <p>Start taking notes to keep track of important information from this course.</p>
            </div>
        `;
        return;
    }
    
    notesList.innerHTML = notes.map(note => `
        <div class="note-item ${note.isPinned ? 'pinned' : ''}" data-note-id="${note.id}">
            <div class="note-header">
                <h5 class="note-title">${escapeHtml(note.title)}</h5>
                <div class="note-actions">
                    <button class="note-action-btn" onclick="togglePinNote('${courseId}', ${note.id})" title="${note.isPinned ? 'Unpin' : 'Pin'} note">
                        <i class="fas fa-thumbtack ${note.isPinned ? 'pinned' : ''}"></i>
                    </button>
                    <button class="note-action-btn" onclick="editNote('${courseId}', ${note.id})" title="Edit note">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="note-action-btn delete" onclick="deleteNote('${courseId}', ${note.id})" title="Delete note">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="note-meta">
                <span class="note-category category-${note.category}">${note.category}</span>
                <span class="note-date">${formatDate(note.updatedAt)}</span>
            </div>
            
            <div class="note-content">${formatNoteContent(note.content)}</div>
            
            ${note.tags.length > 0 ? `
                <div class="note-tags">
                    ${note.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    updateCategoryFilter(courseId);
}

function updateCategoryFilter(courseId) {
    const categoryFilter = document.getElementById(`categoryFilter${courseId}`);
    if (!categoryFilter) return;
    
    const categories = window.notesManager.getCategories(courseId);
    const currentValue = categoryFilter.value;
    
    categoryFilter.innerHTML = categories.map(cat => 
        `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`
    ).join('');
    
    categoryFilter.value = categories.includes(currentValue) ? currentValue : 'all';
}

function updateNotesStats(courseId) {
    const stats = window.notesManager.getStats(courseId);
    
    const totalElement = document.getElementById(`totalNotes${courseId}`);
    const pinnedElement = document.getElementById(`pinnedNotes${courseId}`);
    
    if (totalElement) totalElement.textContent = stats.total;
    if (pinnedElement) pinnedElement.textContent = stats.pinned;
}

function showAddNoteForm(courseId) {
    const noteForm = document.getElementById(`noteForm${courseId}`);
    const formTitle = document.getElementById(`noteFormTitle${courseId}`);
    
    // Reset form
    document.getElementById(`noteId${courseId}`).value = '';
    document.getElementById(`noteTitle${courseId}`).value = '';
    document.getElementById(`noteContent${courseId}`).value = '';
    document.getElementById(`noteCategory${courseId}`).value = 'general';
    
    formTitle.textContent = 'Add New Note';
    noteForm.style.display = 'block';
    document.getElementById(`noteTitle${courseId}`).focus();
    
    setupCharacterCounter(courseId);
}

function editNote(courseId, noteId) {
    const notes = window.notesManager.getCourseNotes(courseId);
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    const noteForm = document.getElementById(`noteForm${courseId}`);
    const formTitle = document.getElementById(`noteFormTitle${courseId}`);
    
    // Populate form with note data
    document.getElementById(`noteId${courseId}`).value = note.id;
    document.getElementById(`noteTitle${courseId}`).value = note.title;
    document.getElementById(`noteContent${courseId}`).value = note.content;
    document.getElementById(`noteCategory${courseId}`).value = note.category;
    
    formTitle.textContent = 'Edit Note';
    noteForm.style.display = 'block';
    document.getElementById(`noteTitle${courseId}`).focus();
    
    setupCharacterCounter(courseId);
}

function saveNote(courseId) {
    const noteId = document.getElementById(`noteId${courseId}`).value;
    const title = document.getElementById(`noteTitle${courseId}`).value.trim();
    const content = document.getElementById(`noteContent${courseId}`).value.trim();
    const category = document.getElementById(`noteCategory${courseId}`).value;
    
    if (!title) {
        alert('Please enter a note title');
        return;
    }
    
    if (!content) {
        alert('Please enter note content');
        return;
    }
    
    try {
        if (noteId) {
            // Update existing note
            window.notesManager.updateNote(courseId, parseInt(noteId), title, content, category);
        } else {
            // Add new note
            window.notesManager.addNote(courseId, title, content, category);
        }
        
        cancelNoteForm(courseId);
        renderNotesList(courseId);
        updateNotesStats(courseId);
        
        showNotification('Note saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving note:', error);
        showNotification('Failed to save note', 'error');
    }
}

function deleteNote(courseId, noteId) {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
        return;
    }
    
    try {
        window.notesManager.deleteNote(courseId, noteId);
        renderNotesList(courseId);
        updateNotesStats(courseId);
        showNotification('Note deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting note:', error);
        showNotification('Failed to delete note', 'error');
    }
}

function togglePinNote(courseId, noteId) {
    try {
        window.notesManager.togglePin(courseId, noteId);
        renderNotesList(courseId);
        updateNotesStats(courseId);
    } catch (error) {
        console.error('Error toggling pin:', error);
    }
}

function cancelNoteForm(courseId) {
    const noteForm = document.getElementById(`noteForm${courseId}`);
    noteForm.style.display = 'none';
}

function searchNotes(courseId, query) {
    clearTimeout(window.notesManager.searchTimeout);
    window.notesManager.searchTimeout = setTimeout(() => {
        renderNotesList(courseId);
    }, 300);
}

function filterNotes(courseId, category) {
    renderNotesList(courseId);
}

function setupCharacterCounter(courseId) {
    const textarea = document.getElementById(`noteContent${courseId}`);
    const counter = document.getElementById(`charCount${courseId}`);
    
    function updateCounter() {
        const count = textarea.value.length;
        counter.textContent = `${count} characters`;
        
        if (count > 2000) {
            counter.style.color = '#f44336';
        } else if (count > 1500) {
            counter.style.color = '#ff9800';
        } else {
            counter.style.color = '#666';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

function closeNotesModal(courseId) {
    const modal = document.getElementById(`notesModal${courseId}`);
    if (modal) {
        modal.remove();
    }
}

// Utility functions
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatNoteContent(content) {
    // Convert line breaks to <br>
    let formatted = escapeHtml(content).replace(/\n/g, '<br>');
    
    // Highlight hashtags
    formatted = formatted.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
    
    // Limit display length
    if (formatted.length > 300) {
        formatted = formatted.substring(0, 300) + '...';
    }
    
    return formatted;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    if (diffMinutes < 10080) return `${Math.floor(diffMinutes / 1440)}d ago`;
    
    return date.toLocaleDateString();
}

function showNotification(message, type = 'info') {
    if (window.courseAuth && window.courseAuth.showMessage) {
        window.courseAuth.showMessage(message, type === 'success' ? 'success' : 'error');
    } else {
        alert(message);
    }
}

// Export for global use
window.notesModule = {
    openNotesModal,
    closeNotesModal,
    NotesManager
};
