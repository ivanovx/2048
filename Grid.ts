class Grid {
    private size: number;
    public cells: any[];
    private previousState: any[];

    public constructor(size: number, previousState?: any[]) {
        this.size = size;
        this.cells = previousState ? this.fromState(previousState) : this.empty();
    }

    public empty(): number[] {
        var cells: any[] = [];

        for (var x = 0; x < this.size; x++) {
            var row: any = cells[x] = [];

            for (var y = 0; y < this.size; y++) {
                row.push(null);
            }
        }

        return cells;
    }

    public fromState(state: any[]): number[] {
        var cells: any[] = [];

        for (var x = 0; x < this.size; x++) {
            var row: any = cells[x] = [];

            for (var y = 0; y < this.size; y++) {
                var tile = state[x][y];
                
                row.push(tile ? new Tile(tile.position, tile.value) : null);
            }
        }

        return cells;
    }

    public randomAvailableCell(): number {
        var cells = this.availableCells();

        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    }

    public availableCells(): number[] {
        var cells: any[] = [];

        this.eachCell(function (x: number, y: number, tile: Tile) {
            if (!tile) {
                cells.push({
                    x: x, 
                    y: y 
                });
            }
        });

        return cells;
    }

    public eachCell(callback: any): void {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                callback(x, y, this.cells[x][y]);
            }
        }
    }

    public cellsAvailable(): boolean {
        return !!this.availableCells().length;
    }

    public cellAvailable(cell: any): boolean {
        return !this.cellOccupied(cell);
    }
    
    public cellOccupied(cell: any): boolean {
        return !!this.cellContent(cell);
    }

    public cellContent(cell: any): any {
        if (this.withinBounds(cell)) {
            return this.cells[cell.x][cell.y];
        } else {
            return null;
        }
    }

    public insertTile(tile: Tile): void {
         this.cells[tile.x][tile.y] = tile;
    }

    public removeTile(tile: Tile): void {
        this.cells[tile.x][tile.y] = null;
    }

    public withinBounds(position: Position): boolean {
        return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
    }

    public serialize(): any {
        var cellState: any[] = [];

        for (var x = 0; x < this.size; x++) {
            var row : any = cellState[x] = [];

            for (var y = 0; y < this.size; y++) {
                row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
            }
        }

        return {
            size: this.size,
            cells: cellState
        };
    }
}