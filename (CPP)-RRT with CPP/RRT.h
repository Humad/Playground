#include <CImg.h>

using cimg_library::CImg;
using std::vector;

struct Node {
  // X,Y coordinates of node in occupancy grid.
  int x;
  int y;
  int parentX;
  int parentY;

  Node() = delete;
  // Initialization constructor.
  Node(const int& x,
       const int& y) :
       x(x),
       y(y) {}
};

class RRT {
  cimg_library::CImg<unsigned char> image;

  RRT() = delete;
  // Initialization constructor.
  public: 
  RRT(const cimg_library::CImg<unsigned char>& image) :
      image(image) {}

  Node NearestNeighbor(vector<Node> node_vector, Node input_node);
  bool CheckCollision(Node start, Node end);
  vector<Node> FindPath(Node start, Node end, int goal_radius, int extension_distance);
  double getDistance(Node first, Node second);
  Node Project(Node nearest, Node sample, int distance);
  Node getParent(Node current, vector<Node> existing_nodes);
};

