function startLifeGame(matrix_size, proportion)
{
	//produce map
	var cell_map = produceMap(matrix_size, proportion);

	// canvas part
	var canvas = document.createElement('canvas');
	canvas.width = String (matrix_size * 7 + 2);
	canvas.height = String (matrix_size * 7 + 2);
	document.getElementById("canvas").appendChild(canvas);
	
	var context = canvas.getContext("2d");
	drawMap(cell_map, context);

	//event part
	var interval = setInterval(function(){
		cell_map = updateMap(cell_map, matrix_size, context);
	} , 800);
}

function produceMap(matrix_size, proportion)
{	
	// produce map by given size and alive:dead proportion
	var cell_map = new Array();
	for (var i = 0;i < matrix_size;i ++)
	{
		cell_map[i] = new Array();
		for (var j = 0;j < matrix_size;j ++)
		{
			cell_map[i][j] = (Math.random() < proportion) ? 1 : 0;
		}
	}
	return cell_map;
}

function specialMap(matrix_size, proportion)
{
	// this function is only for test use
	// initialize the map to null, then designate some cells to alive
	var cell_map = new Array();
	for (var i = 0;i < matrix_size;i ++)
	{
		cell_map[i] = new Array();
		for (var j = 0;j < matrix_size;j ++)
			cell_map[i][j] = 0;
	}

	cell_map[10][10] = 1;
	cell_map[10][11] = 1;
	cell_map[10][12] = 1;

	return cell_map;
}

function drawMap(cell_map, context)
{
	// alive: green, dead: gray
	// a cell is shown with a 2*2 matrix
	for (var i = 0;i < cell_map.length;i ++)
	{
		for (var j = 0;j < cell_map[0].length;j ++)
		{
			if (cell_map[i][j] == 1)
				context.fillStyle = "green";
			else
				context.fillStyle = "#ccc";

			context.fillRect(7*i+1, 7*j+1, 6, 6);
		}
	}
}

function updateMap(cell_map, matrix_size, context)
{
	// update the map and repaint the map
	var tmp_map = copyMap(cell_map);
	for (var i = 0;i < matrix_size;i ++)
	{
		for (var j = 0;j < matrix_size;j ++)
		{
			var count = aliveCount(cell_map, i, j, matrix_size);
			if (count == 3)
				tmp_map[i][j] = 1;
			else if (count == 2)
				continue;
			else
				tmp_map[i][j] = 0;
		}
	}
	drawMap(tmp_map, context);
	return tmp_map;
}

function aliveCount(cell_map, i, j, matrix_size)
{
	// count the number of cells around the center that are alive
	// check if the point is the point itself
	var count = 0
	var tmp_i = 0, tmp_j = 0;
	var tmp_i_mod = 0, tmp_j_mod = 0;
	for (tmp_i = i-1; tmp_i < i+2; tmp_i ++)
	{
		for (tmp_j = j-1; tmp_j < j+2; tmp_j ++)
		{
			tmp_i_mod = (tmp_i + matrix_size) % matrix_size;
			tmp_j_mod = (tmp_j + matrix_size) % matrix_size;

			if (tmp_j_mod == j && tmp_i_mod == i)
				continue;
			else if (cell_map[tmp_i_mod][tmp_j_mod] == 1)
				count += 1;
		}
	}
	return count;
}

function copyMap(map)
{
	var length = map.length;
	var new_map = new Array();
	for (var i = 0;i < length;i ++){
		new_map[i] = new Array();
		for (var j = 0;j < length;j ++)
			new_map[i][j] = map[i][j];
	}
	return new_map;
}