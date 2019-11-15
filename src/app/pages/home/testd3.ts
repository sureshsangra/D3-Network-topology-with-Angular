export let test = {
  'nodes': [
    {'id': 'Alice', 'group': 2},
    {'id': 'Bob', 'group': 3},
     {'id': 'abc', 'group': 4},
    {'id': 'def', 'group': 5},
    {'id': 'dfe', 'group': 6},
    {'id': 'qws', 'group': 7},
    {'id': 'rfd', 'group': 8},
    {'id': 'dfe', 'group': 9},
    {'id': 'qws', 'group': 10},
    {'id': 'rfd', 'group': 11},
    {'id': 'dfe', 'group': 12},
    {'id': 'qws', 'group': 13},
    {'id': 'rfd', 'group': 14},
    {'id': 'Cathy', 'group': 15}
  ],
  'links': [
    {'source': 'Alice', 'target': 'Bob', 'value': 2},
    {'source': 'abc', 'target': 'qws', 'value': 4},
    {'source': 'def', 'target': 'Alice', 'value': 6},
     {'source': 'qws', 'target': 'Cathy', 'value': 8},
     {'source': 'rfd', 'target': 'abc', 'value': 10},
    {'source': 'dfe', 'target': 'Bob', 'value': 12},
    {'source': 'Bob', 'target': 'Alice', 'value': 4},
    {'source': 'Cathy', 'target': 'Alice', 'value': 6}
  ]
}