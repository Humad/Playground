#include <gtest/gtest.h>
#include "assignment8.h"
#include <stdlib.h>

int main(int argc, char * argv[]) {

    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}

TEST(CollisionTest1, CheckCollision) {
    CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(0, 0);
    Node end(0, 0);
    ASSERT_EQ(true, x.CheckCollision(start, end));
}

TEST(CollisionTest2, CheckCollision) {
    CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(24, 8);
    Node end(24, 24);
    ASSERT_EQ(true, x.CheckCollision(start, end));
}

TEST(CollisionTest3, CheckCollision) {
    CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(24, 24);
    Node end(40, 40);
    ASSERT_EQ(true, x.CheckCollision(start, end));
}

TEST(CollisionTest4, CheckCollision) {
    CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(8, 8);
    Node end(48, 8);
    ASSERT_EQ(false, x.CheckCollision(start, end));
}

TEST(CollisionTest5, CheckCollision) {
    CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(8, 8);
    Node end(8, 24);
    ASSERT_EQ(false, x.CheckCollision(start, end));
}

TEST(GetDistance1, getDistance) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(0, 0);
    Node end(0, 0);
    ASSERT_EQ((int) x.getDistance(start, end), 0);
}

TEST(GetDistance2, getDistance) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(8, 8);
    Node end(42, 42);
    ASSERT_EQ((int) x.getDistance(start, end), 48);
}

TEST(GetDistance3, getDistance) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(36, 24);
    Node end(2, 15);
    ASSERT_EQ((int) x.getDistance(start, end), 35);
}

TEST(GetDistance4, getDistance) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(2, 2);
    Node end(2, 2);
    ASSERT_EQ((int) x.getDistance(start, end), 0);
}

TEST(GetDistance5, getDistance) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(-5, 2);
    Node end(2, -9);
    ASSERT_EQ((int) x.getDistance(start, end), 13);
}

TEST(NearestNeighbor1, NearestNeighbor) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);


    vector<Node> existing;
    Node input(0, 0);

    ASSERT_EQ(x.NearestNeighbor(existing, input).x, input.x);
    ASSERT_EQ(x.NearestNeighbor(existing, input).y, input.y);
}

TEST(NearestNeighbor2, NearestNeighbor) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);


    vector<Node> existing;
    Node input(0, 0);
    Node n1(1, 1);
    Node n2(2, 2);
    existing.push_back(n1);
    existing.push_back(n2);

    ASSERT_EQ(x.NearestNeighbor(existing, input).x, n1.x);
    ASSERT_EQ(x.NearestNeighbor(existing, input).y, n1.y);
}

TEST(NearestNeighbor3, NearestNeighbor) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);


    vector<Node> existing;
    Node input(5, 5);
    Node n1(50, 50);
    Node n2(25, 25);
    existing.push_back(n1);
    existing.push_back(n2);

    ASSERT_EQ(x.NearestNeighbor(existing, input).x, n2.x);
    ASSERT_EQ(x.NearestNeighbor(existing, input).y, n2.y);
}

TEST(NearestNeighbor4, NearestNeighbor) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);


    vector<Node> existing;
    Node input(5, 5);
    Node n1(50, 50);
    Node n2(0, 0);
    existing.push_back(n1);
    existing.push_back(n2);

    ASSERT_EQ(x.NearestNeighbor(existing, input).x, n2.x);
    ASSERT_EQ(x.NearestNeighbor(existing, input).y, n2.y);
}

TEST(NearestNeighbor5, NearestNeighbor) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);


    vector<Node> existing;
    Node input(5, 5);
    Node n1(4, 4);
    Node n2(6, 6);
    existing.push_back(n1);
    existing.push_back(n2);

    ASSERT_EQ(x.NearestNeighbor(existing, input).x, n1.x);
    ASSERT_EQ(x.NearestNeighbor(existing, input).y, n1.y);
}

TEST(FindPath1, FindPath) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(8, 8);
    Node end(8, 8);
    vector<Node> path = x.FindPath(start, end, 1, 1);

    ASSERT_EQ(path.size(), 1);
    ASSERT_EQ(path.at(0).x, 8);
    ASSERT_EQ(path.at(0).y, 8);
}

TEST(FindPath2, FindPath) {
	CImg<unsigned char> image;
    image.load("smallmap.png");
    RRT x = RRT(image);

    Node start(8, 8);
    Node end(96, 8);
    vector<Node> path = x.FindPath(start, end, 20, 9);

    ASSERT_EQ(path.at(0).x, 8);
    ASSERT_EQ(path.at(0).y, 8);
    ASSERT_LT(abs(path.at(path.size() - 1).x - 96), 21);
    ASSERT_LT(abs(path.at(path.size() - 1).y - 8), 21);
}

TEST(FindPath3, FindPath) {
    CImg<unsigned char> image;
    image.load("MediumMap.png");
    RRT x = RRT(image);

    Node start(119, 8);
    Node end(137, 249);
    vector<Node> path = x.FindPath(start, end, 20, 9);

    ASSERT_EQ(path.at(0).x, 119);
    ASSERT_EQ(path.at(0).y, 8);
    ASSERT_LT(abs(path.at(path.size() - 1).x - 137), 21);
    ASSERT_LT(abs(path.at(path.size() - 1).y - 249), 21);
}

TEST(FindPath4, FindPath) {
    CImg<unsigned char> image;
    image.load("MediumMap.png");
    RRT x = RRT(image);

    Node start(12, 8);
    Node end(249, 248);
    vector<Node> path = x.FindPath(start, end, 20, 9);

    ASSERT_EQ(path.at(0).x, 12);
    ASSERT_EQ(path.at(0).y, 8);
    ASSERT_LT(abs(path.at(path.size() - 1).x - 249), 21);
    ASSERT_LT(abs(path.at(path.size() - 1).y - 248), 21);
}






