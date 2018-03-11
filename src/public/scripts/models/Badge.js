export default class Badge {
    /**
     * Checklist structure:
     * {
     *   name: String,
     *   items: [
     *     {
     *        text: String,
     *        dueDate: Moment, (optional)
     *        done: Boolean
     *     }
     *   ]
     * }
     *
     * Due date structure:
     * {
     *   date: Moment,
     *   done: Boolean
     * }
     * @param {*} type
     * @param {*} data
     */
    constructor(type, data) {
        if (this.validateType(type)) {
            this._type = type;
        }
        else {
            throw new Error('Invalid type for new Badge');
        }
        if (this.validateData(data)) {
            this._data = data;
        }
        else {
            throw new Error('Invalid data for new Badge');
        }
    }
    // TODO: maybe a library should be used here
    validateData(dataObj) {
        if (this.type === 'checklist') {
            if (dataObj.name && dataObj.items) {
                for (const item of dataObj.items) {
                    if (!item.text || !(typeof item.done === 'boolean')) {
                        return false;
                    }
                }
                return true;
            }
        }
        if (this.type === 'dueDate') {
            return dataObj.date && (typeof dataObj.done === 'boolean');
        }
        // if not one of the specified types then invalid
        return false;
    }
    validateType(typeStr) {
        const validTypes = ['checklist', 'dueDate'];
        return validTypes.includes(typeStr);
    }
    get type() {
        return this._type;
    }
    set type(typeStr) {
        if (this.validateType(typeStr)) {
            this._type = typeStr;
        }
        else {
            throw new Error('Invalid type for Badge');
        }
    }
    get data() {
        return this._data;
    }
    // TODO: set character limit on content
    set data(dataObj) {
        if (this.validateData(dataObj)) {
            this._data = dataObj;
        }
        else {
            throw new Error('Invalid data for Badge');
        }
    }
}
