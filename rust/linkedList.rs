#[derive(Debug)]
struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

#[derive(Debug)]
struct LinkedList<T> {
    head: Option<Box<Node<T>>>,
    length: usize,
}

impl<T> Node<T> {
    fn new(value: T) -> Node<T> {
        Node {
            value: value,
            next: None,
        }
    }
}

impl<T> LinkedList<T> {
    fn new() -> LinkedList<T> {
        Self {
            head: None,
            length: 0,
        }
    }

    fn push(&mut self, value: T) {
        self.length += 1;

        let new_node = Box::new(Node::new(value));

        match &self.head {
            None => {
                self.head = Some(new_node);
            }
            Some(_) => {
                let mut iter = &mut self.head;

                while !&iter.as_ref().unwrap().next.is_none() {
                    iter = &mut (iter.as_mut().unwrap()).next;
                }

                iter.as_mut().unwrap().next = Some(new_node);
            }
        }
    }
}

fn main() {
    let mut list = LinkedList::new();

    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    list.push(5);

    println!("{:?}, {}", list, list.length);
}
