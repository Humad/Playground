#include "assignment7Traversal.h"
#include "assignment7Map.h"

using std::string;
using std::cout;
using std::endl;
using std::vector;

Traversal::Traversal(Map* map) {
  map_ = map;
  visited_nodes_ = new bool[map_->GetNodeListLength()];
  parents_ = new int[map_->GetNodeListLength()];
  occupancy_grid_ptr_ = map_->GetOccupancyGridPtr();
}

Traversal::~Traversal() {
  delete[] visited_nodes_;
  delete[] parents_;
}

bool Traversal::IsGoal(Node* node, const int& goal_id) {
  // TODO: Insert code here
  return node->GetID() == goal_id;
}

bool Traversal::IsVisited(Node* node) {
  // TODO: Insert code here
  return visited_nodes_[node->GetID()];
}

void Traversal::Enqueue(Node* node) {
  // TODO: Insert code here
  q_.push(node);
}

Node* Traversal::Dequeue() {
  // TODO: Insert code here 
  if (!q_.empty()) {
    Node* n = q_.front();
    q_.pop();
    return n;
  }
  return nullptr;
}

void Traversal::GetNodeNeighbors(
  Node* node,
  Node** neighbors) {
  // TODO: Insert code here
  neighbors[0] = node->GetNorth();
  neighbors[1] = node->GetEast();
  neighbors[2] = node->GetSouth();
  neighbors[3] = node->GetWest();
}

Node* Traversal::GetNodeParent(Node* node) {
  // TODO: Insert code here 
  int parentID = parents_[node->GetID()];

  if (parentID == -1) {
    return nullptr;
  }

  Node** nodeList = map_->GetNodeList();
  for (int i = 0; i < map_->GetNodeListLength(); i++) {
    if (nodeList[i]->GetID() == parentID) {
      return nodeList[i];
    }
  }
  return nullptr;
}

void Traversal::RecurBFS(const int& goal_id) {
  // TODO: Insert code here 

  Node* currentNode = Dequeue();

  if (currentNode == nullptr) {
    return;
  }

  if (IsGoal(currentNode, goal_id)) {
    return;
  }

  Node* neighbors[4];
  GetNodeNeighbors(currentNode, neighbors);


  for (int i = 0; i < 4; i++) {
    if (neighbors[i] != nullptr && !IsVisited(neighbors[i])) {
      parents_[neighbors[i]->GetID()] = currentNode->GetID();
      visited_nodes_[neighbors[i]->GetID()] = true;
      Enqueue(neighbors[i]);
    }
  }

  RecurBFS(goal_id);
}

std::string Traversal::TracePath(Node* node) {
  // TODO: Insert code here 

  if (!IsVisited(node)) {
    return "";
  }

  string result = "";
  Node* parent = GetNodeParent(node);

  while (parent != nullptr) {

    if (parent->GetNorth() == node) {
      result = "N" + result;
    }

    if (parent->GetSouth() == node) {
      result = "S" + result;
    }

    if (parent->GetEast() == node) {
      result = "E" + result;
    }

    if (parent->GetWest() == node) {
      result = "W" + result;
    }

    node = parent;
    parent = GetNodeParent(node);
  }

  return result;
}

std::string Traversal::RunBFS(const int& start_id, const int& goal_id) {
  // TODO: Insert code here

  // If goal id and start id are out of range, then no path exists
  if (goal_id < 0 || goal_id >= map_->GetNodeListLength() 
    || start_id < 0 || start_id >= map_->GetNodeListLength()) {
    return "";
  }

  // Reset initial values
  for (int i = 0; i < map_->GetNodeListLength(); i++) {visited_nodes_[i] = false;}
  for (int i = 0; i < map_->GetNodeListLength(); i++) {parents_[i] = -1;}


  // Get start Node
  Node* startNode;
  Node* goalNode;
  Node** nodeList = map_->GetNodeList();

  for (int i = 0; i < map_->GetNodeListLength(); i++) {

    if (nodeList[i]->GetID() == start_id) {
      startNode = nodeList[i];
    }

    if (nodeList[i]->GetID() == goal_id) {
      goalNode = nodeList[i];
    }
  }

  // Enqueue and start search
  parents_[startNode->GetID()] = -1;
  visited_nodes_[startNode->GetID()] = true;
  Enqueue(startNode);

  RecurBFS(goal_id);

  if (start_id == goal_id) {
    return "N";
  }

  return TracePath(goalNode);
}

std::vector<Node*> Traversal::GetFrontierAtDepth(
      const int& start_id,
      const int& depth) {

  // Set up
  int currentDepth = 0;
  bool visited[map_->GetNodeListLength()];
  for (int i = 0; i < map_->GetNodeListLength(); i++) {visited[i] = false;}

  // Get start node
  Node* startNode;
  Node** nodeList = map_->GetNodeList();
  for (int i = 0; i < map_->GetNodeListLength(); i++) {
    if (nodeList[i]->GetID() == start_id) {
      startNode = nodeList[i];
    }
  }
  visited[startNode->GetID()] = true;

  // Set up lists
  vector<Node*> current;
  vector<Node*> pending;
  current.push_back(startNode);
  visited[startNode->GetID()] = true;

  while (currentDepth < depth) {
    for (int i = 0; i < current.size(); i++) {
      pending.push_back(current[i]);
      
    }

    current.clear();

    for (int i = 0; i < pending.size(); i++) {
      Node* n = pending[i];
      Node* neighbors[4];
      GetNodeNeighbors(n, neighbors);
      for (int i = 0; i < 4; i++) {
        if (neighbors[i] != nullptr && !visited[neighbors[i]->GetID()]) {
          current.push_back(neighbors[i]);
          visited[neighbors[i]->GetID()] = true;
        }
      }
    }

    pending.clear();

    currentDepth++;
  }

  for (int i = 0; i < current.size(); i++) {
    cout << current[i]->GetID() << ", ";
  }

  return current;
}

void Traversal::DrawTraversal(const int& goal_id) {
  if (occupancy_grid_ptr_ == nullptr) {
    return;
  }
  const unsigned char color[] = {200};
  const unsigned char dColor[] = {100};
  for (size_t i = 0; i < sqrt(map_->GetNodeListLength()); i++) {
    for (size_t j = 0; j < sqrt(map_->GetNodeListLength()); j++) {
      int id = map_->GenerateNodeID(
        16 * i + 9,
        16 * j + 9);
      Node* current_node = map_->GetNodeList()[id];
      if (IsVisited(current_node)) {
        occupancy_grid_ptr_->draw_circle(
          16 * i + 9,
          16 * j + 9,
          6,
          color);
      }
      if (id == goal_id) {
        occupancy_grid_ptr_->draw_circle(
          16 * i + 9,
          16 * j + 9,
          6,
          dColor);
      }
    }
  }
  display = *occupancy_grid_ptr_;
  display.show();
  usleep(200000);
}