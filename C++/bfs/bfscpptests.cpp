#include <iostream>
#include <gtest/gtest.h>
#include <algorithm>
#include "CImg.h"
#include "assignment7Traversal.h"

using std::cout;
using std::endl;

TEST(BFS, NoTraversal) {
  /* Map for fully connected structure shown 
     ___ ___ 
    |   |   |
    | 0 | 1 |
    |___|___|
    |   |   |
    | 2 | 3 |
    |___|___|
  */
  Node** node_list = new Node*[4];
  Node* node_0 = new Node(0);
  Node* node_1 = new Node(1);
  Node* node_2 = new Node(2);
  Node* node_3 = new Node(3);
  
  node_0->SetNorth(nullptr);
  node_0->SetSouth(node_2);
  node_0->SetEast(node_1);
  node_0->SetWest(nullptr);

  node_1->SetNorth(nullptr);
  node_1->SetSouth(node_3);
  node_1->SetEast(nullptr);
  node_1->SetWest(node_0);

  node_2->SetNorth(node_0);
  node_2->SetSouth(nullptr);
  node_2->SetEast(node_3);
  node_2->SetWest(nullptr);

  node_3->SetNorth(node_1);
  node_3->SetSouth(nullptr);
  node_3->SetEast(nullptr);
  node_3->SetWest(node_2);

  node_list[0] = node_0;
  node_list[1] = node_1;
  node_list[2] = node_2;
  node_list[3] = node_3;

  Map test_map = Map(node_list, 4);
  Traversal test_traversal(&test_map);
  int start_id = 0;
  int goal_id = 0;
  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);
  EXPECT_EQ(1, test_path.length());
  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};
  EXPECT_NE(
    std::find(
      possible_answers.begin(),
      possible_answers.end(),
      test_path),
    possible_answers.end());

  cout << test_path << endl;

  delete node_list[0];
  delete node_list[1];
  delete node_list[2];
  delete node_list[3];

  delete[] node_list;
}

TEST(BFS, OneNodeGoal) {
  Node** nodeList = new Node*[1];
  Node* node0 = new Node(0);

  node0->SetNorth(nullptr);
  node0->SetSouth(nullptr);
  node0->SetWest(nullptr);
  node0->SetEast(nullptr);

  nodeList[0] = node0;

  Map test_map = Map(nodeList, 1);
  Traversal test_traversal(&test_map);
  int start_id = 0;
  int goal_id = 0;
  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(1, test_path.length());

  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};

  EXPECT_NE(
    std::find(
      possible_answers.begin(),
      possible_answers.end(),
      test_path),
    possible_answers.end());

  cout << test_path << endl;

  delete nodeList[0];
  delete[] nodeList;
}

TEST(BFS, OneNodeNoGoal) {
  Node** nodeList = new Node*[1];
  Node* node0 = new Node(0);

  node0->SetNorth(nullptr);
  node0->SetSouth(nullptr);
  node0->SetWest(nullptr);
  node0->SetEast(nullptr);

  nodeList[0] = node0;

  Map test_map = Map(nodeList, 1);
  Traversal test_traversal(&test_map);
  int start_id = 0;
  int goal_id = 1;
  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());

  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};

  cout << test_path << endl;

  delete nodeList[0];
  delete[] nodeList;
}

TEST(BFS, TwoNodesGoal) {
  Node** nodeList = new Node*[2];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);

  node0->SetNorth(nullptr);
  node0->SetSouth(nullptr);
  node0->SetWest(node1);
  node0->SetEast(nullptr);

  node1->SetNorth(nullptr);
  node1->SetSouth(nullptr);
  node1->SetEast(nullptr);
  node1->SetWest(nullptr);

  nodeList[0] = node0;
  nodeList[1] = node1;

  Map test_map = Map(nodeList, 2);
  Traversal test_traversal(&test_map);

  int start_id = 0;
  int goal_id = 1;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(1, test_path.length());

  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};

  EXPECT_EQ("W", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete[] nodeList;
}

TEST(BFS, TwoNodesNoGoal) {
  Node** nodeList = new Node*[2];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);

  node0->SetNorth(nullptr);
  node0->SetSouth(nullptr);
  node0->SetWest(nullptr);
  node0->SetEast(nullptr);

  node1->SetNorth(nullptr);
  node1->SetSouth(nullptr);
  node1->SetEast(nullptr);
  node1->SetWest(nullptr);

  nodeList[0] = node0;
  nodeList[1] = node1;

  Map test_map = Map(nodeList, 2);
  Traversal test_traversal(&test_map);

  int start_id = 0;
  int goal_id = 1;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());

  EXPECT_EQ("", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete[] nodeList;
}

TEST(BFS, TwoEdgesGoal) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(node3);
  node0->SetWest(nullptr);
  node0->SetEast(node1);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(node0);
  node1->SetEast(node2);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(node0);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(node2);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 6;
  int goal_id = 0;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(2, test_path.length());

  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};

  EXPECT_EQ("NN", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;
}

TEST(BFS, TwoEdgesNoGoal) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(node3);
  node0->SetWest(nullptr);
  node0->SetEast(node1);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(node0);
  node1->SetEast(nullptr);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(node0);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(nullptr);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 3;
  int goal_id = 2;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());

  std::vector<std::string> possible_answers =
    {"N", "S", "E", "W"};

  EXPECT_EQ("", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;
}

TEST(BFS, FourEdgesGoal) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(node3);
  node0->SetWest(nullptr);
  node0->SetEast(node1);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(node0);
  node1->SetEast(node2);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(node0);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(node2);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 2;
  int goal_id = 6;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(4, test_path.length());

  std::vector<std::string> possible_answers =
    {"WWSS", "WSWS", "SSWW", "SWSW"};

  EXPECT_NE(
    std::find(
      possible_answers.begin(),
      possible_answers.end(),
      test_path),
    possible_answers.end());

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;
}

TEST(BFS, FourEdgesNoGoal) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(nullptr);
  node0->SetWest(nullptr);
  node0->SetEast(nullptr);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(nullptr);
  node1->SetEast(node2);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(nullptr);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(node2);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 2;
  int goal_id = 0;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());

  EXPECT_EQ("", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;
}

TEST(BFS, IncorrectStartID) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(node3);
  node0->SetWest(nullptr);
  node0->SetEast(node1);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(node0);
  node1->SetEast(node2);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(node0);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(node2);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 9;
  int goal_id = 0;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());
  EXPECT_EQ("", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;  
}

TEST(BFS, IncorrectGoalID) {
  Node** nodeList = new Node*[9];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);
  Node* node3 = new Node(3);
  Node* node4 = new Node(4);
  Node* node5 = new Node(5);
  Node* node6 = new Node(6);
  Node* node7 = new Node(7);
  Node* node8 = new Node(8);

  node0->SetNorth(nullptr);
  node0->SetSouth(node3);
  node0->SetWest(nullptr);
  node0->SetEast(node1);

  node1->SetNorth(nullptr);
  node1->SetSouth(node4);
  node1->SetWest(node0);
  node1->SetEast(node2);

  node2->SetNorth(nullptr);
  node2->SetWest(node1);
  node2->SetSouth(node5);
  node2->SetEast(nullptr);

  node3->SetNorth(node0);
  node3->SetWest(nullptr);
  node3->SetSouth(node6);
  node3->SetEast(node4);

  node4->SetNorth(node1);
  node4->SetWest(node3);
  node4->SetSouth(node7);
  node4->SetEast(node5);

  node5->SetNorth(node2);
  node5->SetWest(node4);
  node5->SetSouth(node8);
  node5->SetEast(nullptr);

  node6->SetNorth(node3);
  node6->SetWest(nullptr);
  node6->SetSouth(nullptr);
  node6->SetEast(node7);

  node7->SetNorth(node4);
  node7->SetWest(node6);
  node7->SetSouth(nullptr);
  node7->SetEast(node8);

  node8->SetNorth(node5);
  node8->SetWest(node7);
  node8->SetSouth(nullptr);
  node8->SetEast(nullptr);


  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;
  nodeList[3] = node3;
  nodeList[4] = node4;
  nodeList[5] = node5;
  nodeList[6] = node6;
  nodeList[7] = node7;
  nodeList[8] = node8;


  Map test_map = Map(nodeList, 9);
  Traversal test_traversal(&test_map);

  int start_id = 0;
  int goal_id = -1;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(0, test_path.length());
  EXPECT_EQ("", test_path);

  cout << test_path << endl;

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete nodeList[3];
  delete nodeList[4];
  delete nodeList[5];
  delete nodeList[6];
  delete nodeList[7];
  delete nodeList[8];
  delete[] nodeList;  
}

TEST(BFS, IsList) {
  Node** nodeList = new Node*[3];
  Node* node0 = new Node(0);
  Node* node1 = new Node(1);
  Node* node2 = new Node(2);

  node0->SetNorth(nullptr);
  node0->SetSouth(node1);
  node0->SetWest(nullptr);
  node0->SetEast(nullptr);

  node1->SetNorth(nullptr);
  node1->SetSouth(node2);
  node1->SetEast(nullptr);
  node2->SetWest(nullptr);

  node2->SetNorth(nullptr);
  node2->SetEast(nullptr);
  node2->SetWest(nullptr);
  node2->SetSouth(nullptr);

  nodeList[0] = node0;
  nodeList[1] = node1;
  nodeList[2] = node2;

  Map test_map = Map(nodeList, 3);
  Traversal test_traversal(&test_map);

  int start_id = 0;
  int goal_id = 2;

  std::string test_path =
    test_traversal.RunBFS(start_id, goal_id);

  EXPECT_EQ(2, test_path.length());
  EXPECT_EQ("SS", test_path);

  delete nodeList[0];
  delete nodeList[1];
  delete nodeList[2];
  delete[] nodeList;

}

int main(int argc, char * argv[]) {
  if (argc == 2) {
    CImg<unsigned char> image;
    image.load(argv[1]);
    CImg<unsigned char>* image_ptr = &image;

    Map my_map = Map(image_ptr);
    Traversal my_traversal = Traversal(&my_map);
    int start_id = my_map.GenerateNodeID(2, 2);
    int goal_id = my_map.GenerateNodeID(19, 19);
    std::string path = my_traversal.RunBFS(start_id, goal_id);
    std::cout << "Path from Node " << start_id
      << " to " << goal_id << " is " << path << std::endl;
  }
  else {
    cout << "Usage: ./assignment7 <map_file_name>" << endl;
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
  }


  return 0;
}
