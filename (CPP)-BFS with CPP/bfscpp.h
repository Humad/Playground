#ifndef TRAVERSAL_H
#define TRAVERSAL_H
#include "assignment7Map.h"
#include <queue>
#include <math.h>

class Traversal {
  public:
    Traversal(Map* map);
    ~Traversal();
    bool IsGoal(Node* node, const int& goal_id);
    bool IsVisited(Node* node);
    void Enqueue(Node* node);
    Node* Dequeue();
    void GetNodeNeighbors(Node* node, Node** neighbors);
    Node* GetNodeParent(Node* node);
    void RecurBFS(const int& goal_id);
    std::string TracePath(Node* node);
    std::string RunBFS(
      const int& start_id,
      const int& goal_id);
    std::vector<Node*> GetFrontierAtDepth(
      const int& start_id,
      const int& depth);
  private:
    Map* map_;
    bool* visited_nodes_;
    int* parents_;
    std::queue<Node*> q_;
    CImg<unsigned char>* occupancy_grid_ptr_;
    cimg_library::CImgDisplay display;
    void DrawTraversal(const int& goal_id);
    void ClearQueue();
};
#endif