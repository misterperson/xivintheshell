export const ActionType = {
	Skill: "Skill",
	Wait: "Wait"
};

function verifyActionNode(action) {
	console.assert(typeof action !== "undefined");
	if (action.type === ActionType.Skill) {
		console.assert(typeof action.skillName === "string");
		return;
	} else if (action.type === ActionType.Wait) {
		console.assert(!isNaN(parseFloat(action.duration)));
		return;
	}
	console.assert(false);
}

export class ActionNode {
	type;
	next = null;
	#selected = false;
	constructor(actionType) {
		this.type = actionType;
	}
	isSelected() { return this.#selected; }
	select() {
		console.log("select: ");
		console.log(this);
		this.#selected = true;
	}
	unselect() {
		this.#selected = false;
	}
}

// a sequence of actions
export class Recording {
	head = null;
	tail = null;
	selectionStart = null;
	selectionEnd = null;
	constructor(config) {
		this.config = config;
	}
	addActionNode(actionNode) {
		console.assert(actionNode);
		if (this.tail) console.assert(this.tail.next === null);
		verifyActionNode(actionNode);
		if (this.head === null) {
			this.head = actionNode;
		} else {
			this.tail.next = actionNode;
		}
		this.tail = actionNode;
	}
	getFirstAction() {
		return this.head;
	}
	getLastAction() {
		return this.tail;
	}
	// assume node is actually in this recording
	selectSingle(node) {
		this.#unselectAll();
		node.select();
		this.selectionStart = node;
		this.selectionEnd = node;
	}
	#unselectAll() {
		for (let itr = this.head; itr !== null; itr = itr.next) {
			itr.unselect();
		}
	}
	#selectSequence(first, last) {
		this.#unselectAll();
		for (let itr = first; itr !== last.next; itr = itr.next) {
			itr.select();
		}
	}
	// returns true on success
	selectUntil(node) {
		if (this.selectionStart) {
			for (let itr = this.selectionStart; itr !== null; itr = itr.next) {
				if (itr === node) {
					this.#selectSequence(this.selectionStart, node);
					return true;
				}
			}
			// failed to find node from going down the currently selected list
			for (let itr = node; itr !== null; itr = itr.next) {
				if (itr === this.selectionStart) {
					this.#selectSequence(node, this.selectionStart);
					return true;
				}
			}
			// failed both ways (shouldn't get here)
			console.assert(false);
		} else {
			this.selectSingle(node);
		}
	}
	serialized() {
		let list = [];
		let itr = this.head;
		while (itr !== null) {
			list.push({
				type: itr.type,
				// skill
				skillName: itr.skillName,
				// wait
				duration: itr.duration,
			});
			itr = itr.next;
		}
		return {
			config: this.config,
			actions: list,
		};
	}
}

