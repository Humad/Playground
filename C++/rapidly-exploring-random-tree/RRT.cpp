#include "assignment8.h"
#include <math.h>
#include <iostream>

using cimg_library::CImg;
using cimg_library::CImgDisplay;
using std::vector;
using std::cout;
using std::endl;

Node RRT::NearestNeighbor(vector<Node> node_vector, Node input_node) {
	if (node_vector.size() == 0) {
		return input_node;
	}

	Node target = node_vector.at(0);
	double minDistance = getDistance(target, input_node);

	for (int i = 1; i < node_vector.size(); i++) {

		double newDistance = getDistance(node_vector.at(i), input_node);
		if (newDistance < minDistance) {
			target = node_vector.at(i);
			minDistance = newDistance;
		}

	}

	return target;
}

double RRT::getDistance(Node first, Node second) {
	return sqrt(
		((first.x - second.x) * (first.x - second.x))
		 + 
		((first.y - second.y) * (first.y - second.y))
		);
}

bool RRT::CheckCollision(Node start, Node end) {
	int x0 = start.x;
	int x1 = end.x;
	int y0 = start.y;
	int y1 = end.y;

	int dx = x1 - x0;
	int dy = y1 - y0;

	int stepX;
	int stepY;

	if (dx < 0) {
		dx = dx * (-1);
		stepX = -1;
	} else {
		stepX = 1;
	}

	if (dy < 0) {
		dy = dy * (-1);
		stepY = -1;
	} else {
		stepY = 1;
	}

	dx = dx * 2;
	dy = dy * 2;

	if (image(x0, y0) == 0) {
		return true;
	}

	if (dx > dy) {

		int fraction = dy - (dx / 2);
		while (x0 != x1) {
			x0 = x0 + stepX;
			if (fraction >= 0) {
				y0 = y0 + stepY;
				fraction = fraction - dx;
			}
			fraction = fraction + dy;

			if (image(x0, y0) == 0) {
				return true;
			}

		}
	
	} else {

		int fraction = dx - (dy / 2);
		while (y0 != y1) {
			if (fraction >= 0) {
				x0 = x0 + stepX;
				fraction = fraction - dy;
			}
			y0 = y0 + stepY;
			fraction = fraction + dx;

			if (image(x0, y0) == 0) {
				return true;
			}
		}

	}

	return false;
}

vector<Node> RRT::FindPath(Node start, Node end, int goal_radius, int extension_distance) {
	vector<Node> existing_nodes;
	start.parentX = -1;
	start.parentY = -1;
	existing_nodes.push_back(start);
	bool done = true;

	if ((int) getDistance(start, end) > extension_distance) {
		done = false;
	}

	Node current = start;

	while (!done) {
		int maxX = image.width() - 1;
		int maxY = image.height() - 1;

		int newX = rand() % maxX + 1;
		int newY = rand() % maxY + 1;

		Node sample(newX, newY);

		Node nearest = NearestNeighbor(existing_nodes, sample);

		if (getDistance(nearest, sample) > extension_distance) {

			Node pSample = Project(nearest, sample, extension_distance);

			bool collision = CheckCollision(nearest, pSample);

			if (!collision) {
				Node newNode(pSample.x, pSample.y);
				// link path
				newNode.parentX = nearest.x;
				newNode.parentY = nearest.y;

				//cout << "No collision; Looking at: " << newNode.x << ", " << newNode.y << endl;
				//image.draw_line(newNode.x, newNode.y, nearest.x, nearest.y, color, 1, ~0U, 1);


				existing_nodes.push_back(newNode);
				if (getDistance(newNode, end) < goal_radius && !CheckCollision(newNode, end)) {
					done = true;
				}
			}
		}
	}

	vector<Node> path;
	current = existing_nodes.at(existing_nodes.size() - 1);
	while (current.parentX != -1 && current.parentY != -1) {
		path.insert(path.begin(), current);
		current = getParent(current, existing_nodes);
	}

	path.insert(path.begin(), current);


	////////////////////////////////
	/////////// DRAW ///////////////
/*	CImg<unsigned char> img(image);
	img.draw_circle(current.x, current.y, 3, color, 1);

	for (int i = 0; i < path.size(); i++) {
		Node temp = path.at(i);
		img.draw_line(current.x, current.y, temp.x, temp.y, color, 1, ~0U, 1);
		current = temp;
	}

	img.draw_circle(current.x, current.y, 3, color, 1);

	CImgDisplay display(img, "img");
	while (!display.is_closed()) {
		display.wait();
	}*/
	///////////////////////////////
	///////////////////////////////

	return path;
}

Node RRT::Project(Node nearest, Node sample, int distance) {
	int dx = sample.x - nearest.x;
	int dy = sample.y - nearest.y;
	int stepX;
	int stepY;

	if (dx < 0) {
		stepX = 1;
	} else {
		stepX = -1;
	}

	if (dy < 0) {
		stepY = 1;
	} else {
		stepY = -1;
	}

	while (getDistance(sample, nearest) > distance) {
		sample.x = sample.x + stepX;
		sample.y = sample.y + stepY;
	}

	return sample;
}

Node RRT::getParent(Node current, vector<Node> existing_nodes) {
	for (int i = 0; i < existing_nodes.size(); i++) {
		if (existing_nodes.at(i).x == current.parentX && existing_nodes.at(i).y == current.parentY) {
			return existing_nodes.at(i);
		}
	}
	return current;
}
