$(document).ready(function(){
	function addNewRow(item,i){
		// nothing fancy here. Just set up the new HTML in a template literal
		return(
			`<div class="toDoItem col s12">
				<div class="input-field col s1 offset-s2 toDoCheck">
						<input type="checkbox" id="check${i}" ${item.done ? 'checked' : ''} /><label for="check${i}"></label>
				</div>
				<div class="input-field col s6 toDoText">
					<input id="toDo${i}" type="text" value="${item.text}" />
					<label for="toDo${i}">ToDo ${i+1}</label>
				</div>
				<div class="col s1 toDoDelete">
					<i class="material-icons">clear</i>
				</div>
			</div>`
		);
	}

	function deleteItem(elem,i){
			// get the LocalData
			let toDoData = JSON.parse(localStorage.getItem('toDoData'));
			// remove this one
			toDoData.items.splice(i,1);
			// Update total
			toDoData.total = toDoData.items.length
			// Update localStorage
			// check to see if there's anything left
			if(toDoData.total === 0){
				// if not, delete the localStorage key
				localStorage.removeItem('toDoData');
			}else{
				// if so, update the localStorage
				localStorage.setItem('toDoData',JSON.stringify(toDoData));
			}
			// Blow it away...
			console.log($(elem))
			$(elem).parent().parent().remove();		
	}

	// Manage the LocalStorate Stuff
	function updateToDoLocalStorage(newItem,i){
		// See if there is anything in localStorage
		var toDoData = JSON.parse(localStorage.getItem('toDoData'));
		// If there isn't, then set up a new object to work with
		if(!toDoData){
			// console.log(toDoData);
			const newData = {
				total: 1,
				items: [{	
					text: newItem,
					done: false
				}]
			}
			toDoData = newData;
		}else{
			// if there is, then...
			if(toDoData.items.length == i){
				// if this is a new item, push
				toDoData.items.push({
					text: newItem,
					done:false
				});
			}else{
				// else update the right item and total
				toDoData.items[i].text = newItem;
			}
		}
		// Update the total
		toDoData.total = toDoData.items.length
		// update theLocalStorage
		localStorage.setItem('toDoData',JSON.stringify(toDoData));
	}

	function flipCheckBox(elem, i){
		// the click is on the div because material styles it that way
		// The actual input box we are going to change is the first child of that div
		const checkBox = $(elem).find('input:first');
		console.log(checkBox)
		// get current status of checkbox and flip it
		var checked = checkBox.attr('checked');
		if(checked){
			checked = false;
		}else{
			checked = true;
		}
		// get the localStorage
		var toDoData = JSON.parse(localStorage.getItem('toDoData'));		
		// Update the done property
		toDoData.items[i].done = checked;
		// update localStorage
		localStorage.setItem('toDoData',JSON.stringify(toDoData));
		checkBox.attr('checked',checked);		
	}

	// Add listeners to input change, checkbox click and delete click
	function addListeners(){
		var toDoItems = $('.toDoText input');
		toDoItems.each(function(i,elem){
			$(elem).change(function(e){
				updateToDoLocalStorage(e.target.value,i)
			});
		});

		// Get all the delete icons
		var deleteItems = $('.toDoDelete .material-icons');
		// loop through...
		deleteItems.each(function(i,elem){
			$(elem).click(function(e){
				deleteItem(elem, i);
			})
		});

		var toDoChecks = $('.toDoCheck');
		toDoChecks.each(function(i, elem){
			$(elem).click(function(e){
				flipCheckBox(elem,i);
			});
		});
	}


	// Wipe out the localStorage if user clicks
	$('#clearToDo').click(()=>{
		localStorage.removeItem('toDoData');
		$('#toDoList').html('');
	})

	$('#seedTheList').click(()=>{
		// seedData is part of root scope and is available via the script tag in index.html
		const seedHTML = seedData.items.map((item, i)=>{
			return addNewRow(item,i);
		});
		$('#toDoList').html(seedHTML)
		localStorage.setItem('toDoData',JSON.stringify(seedData));
		addListeners();
	})

	///////////////////////////////////
	///////////Page Setup//////////////
	///////////////////////////////////
	// Check for previous data
	const toDoData = JSON.parse(localStorage.getItem('toDoData'));
	var startingHTML = "";
	// if it exists...
	if(toDoData){
		startingHTML = 
			toDoData.items.map((item, i)=>{
				return addNewRow(item,i);
			});
	}else{
		startingHTML = addNewRow({text:'Add something!'},0);
	}
	// Put 'whatever' HTML in the DOM
	$('#toDoList').html(startingHTML);
	addListeners();


	$('#addNewToDo').click(()=>{
		// No reason to add if there is already an extra
		if($('.toDoText:last input').val() === ""){
			console.log("Already one here");			
		}else{
			console.log("Make a new one");
			let toDoTotal = JSON.parse(localStorage.getItem('toDoData')).total;
			$('#toDoList').append(addNewRow({text:''},toDoTotal));
			// Add listeners to the new element
			$('.toDoText:last input').change(function(e){
				updateToDoLocalStorage(e.target.value,toDoTotal)
			});
			$('.toDoDelete:last .material-icons').click(function(e){
				deleteItem($(this), toDoTotal);
			});
			$('.toDoCheck:last').click(function(e){
				flipCheckBox($(this),toDoTotal);
			});
		}
	})
});
